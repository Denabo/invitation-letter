<?php
declare(strict_types=1);

/**
 * RSVP endpoint for shared PHP/MySQL hosting.
 *
 * Upload this file to your hosting as /api/rsvp.php, create the table from
 * api/schema.mysql.sql, then fill DB_* constants below with hosting values.
 */

const DB_HOST = 'localhost';
const DB_NAME = 'YOUR_DATABASE_NAME';
const DB_USER = 'YOUR_DATABASE_USER';
const DB_PASS = 'YOUR_DATABASE_PASSWORD';
const DB_CHARSET = 'utf8mb4';

const MAX_JSON_BYTES = 16384;

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed', 'METHOD_NOT_ALLOWED');
}

try {
    $payload = readJsonPayload();
    $rsvp = validateRsvp($payload);
    $pdo = createPdo();
    $savedRsvp = insertRsvp($pdo, $rsvp);

    respond(201, true, null, null, ['data' => $savedRsvp]);
} catch (InvalidArgumentException $error) {
    respond(400, false, $error->getMessage(), 'VALIDATION_ERROR');
} catch (PDOException $error) {
    error_log('RSVP database error: ' . $error->getMessage());

    if ($error->getCode() === '23000') {
        respond(
            409,
            false,
            'Вы уже отправили анкету. Один гость может отправить анкету только один раз.',
            'DUPLICATE_RSVP'
        );
    }

    respond(500, false, 'Internal server error', 'DATABASE_ERROR');
} catch (Throwable $error) {
    error_log('RSVP unexpected error: ' . $error->getMessage());
    respond(500, false, 'Internal server error', 'INTERNAL_SERVER_ERROR');
}

function createPdo(): PDO
{
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);

    return new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
}

/**
 * @return array<string, mixed>
 */
function readJsonPayload(): array
{
    $rawBody = file_get_contents('php://input', false, null, 0, MAX_JSON_BYTES + 1);

    if ($rawBody === false || $rawBody === '') {
        throw new InvalidArgumentException('Request body is required');
    }

    if (strlen($rawBody) > MAX_JSON_BYTES) {
        throw new InvalidArgumentException('Request body is too large');
    }

    $payload = json_decode($rawBody, true);

    if (!is_array($payload) || json_last_error() !== JSON_ERROR_NONE) {
        throw new InvalidArgumentException('Invalid JSON request body');
    }

    return $payload;
}

/**
 * @param array<string, mixed> $payload
 * @return array<string, mixed>
 */
function validateRsvp(array $payload): array
{
    $name = cleanString($payload['name'] ?? '', 100);
    if ($name === '') {
        throw new InvalidArgumentException('Name is required');
    }

    $attendance = cleanString($payload['attendance'] ?? 'MAYBE', 20);
    if (!in_array($attendance, ['ATTENDING', 'NOT_ATTENDING', 'MAYBE'], true)) {
        throw new InvalidArgumentException('Attendance has invalid value');
    }

    $withPartner = yesNoToBool($payload['withPartner'] ?? 'no');
    $withKids = yesNoToBool($payload['withKids'] ?? 'no');
    $hasCar = yesNoToBool($payload['hasCar'] ?? 'no');
    $hasFreeSeats = $hasCar ? yesNoToBool($payload['hasFreeSeats'] ?? 'no') : false;
    $freeSeats = cleanString($payload['freeSeats'] ?? '', 2);

    return [
        'name' => $name,
        'attendance' => $attendance,
        'with_partner' => $withPartner,
        'partner_name' => $withPartner ? nullableString($payload['partnerName'] ?? '', 100) : null,
        'with_kids' => $withKids,
        'children' => $withKids ? normalizeChildren($payload['children'] ?? []) : [],
        'has_car' => $hasCar,
        'has_free_seats' => $hasFreeSeats,
        'free_seats_count' => $hasFreeSeats && $freeSeats !== '' ? parseFreeSeats($freeSeats) : null,
        'comment' => nullableString($payload['comment'] ?? '', 500),
        'message' => nullableString($payload['message'] ?? '', 500),
        'raw_payload' => $payload,
    ];
}

function cleanString(mixed $value, int $maxLength): string
{
    $string = trim((string) $value);

    if (mb_strlen($string, 'UTF-8') > $maxLength) {
        throw new InvalidArgumentException('Field is too long');
    }

    return $string;
}

function nullableString(mixed $value, int $maxLength): ?string
{
    $string = cleanString($value, $maxLength);
    return $string === '' ? null : $string;
}

function yesNoToBool(mixed $value): bool
{
    $string = cleanString($value, 3);

    if (!in_array($string, ['yes', 'no'], true)) {
        throw new InvalidArgumentException('Boolean field has invalid value');
    }

    return $string === 'yes';
}

/**
 * @return array<int, array{name: string, age: string}>
 */
function normalizeChildren(mixed $children): array
{
    if (!is_array($children)) {
        throw new InvalidArgumentException('Children must be an array');
    }

    if (count($children) > 10) {
        throw new InvalidArgumentException('No more than 10 children can be submitted');
    }

    $normalized = [];
    foreach ($children as $child) {
        if (!is_array($child)) {
            throw new InvalidArgumentException('Child entry is invalid');
        }

        $normalized[] = [
            'name' => cleanString($child['name'] ?? '', 100),
            'age' => cleanString($child['age'] ?? '', 20),
        ];
    }

    return $normalized;
}

function parseFreeSeats(string $freeSeats): int
{
    if (!ctype_digit($freeSeats)) {
        throw new InvalidArgumentException('Free seats must be a positive number');
    }

    $count = (int) $freeSeats;
    if ($count < 0 || $count > 99) {
        throw new InvalidArgumentException('Free seats must be less than 100');
    }

    return $count;
}

/**
 * @param array<string, mixed> $rsvp
 * @return array<string, mixed>
 */
function insertRsvp(PDO $pdo, array $rsvp): array
{
    $statement = $pdo->prepare(
        'INSERT INTO rsvp_submissions (
            guest_name,
            attendance,
            with_partner,
            partner_name,
            with_kids,
            children,
            has_car,
            has_free_seats,
            free_seats_count,
            comment,
            message,
            raw_payload
        ) VALUES (
            :guest_name,
            :attendance,
            :with_partner,
            :partner_name,
            :with_kids,
            :children,
            :has_car,
            :has_free_seats,
            :free_seats_count,
            :comment,
            :message,
            :raw_payload
        )'
    );

    $statement->execute([
        ':guest_name' => $rsvp['name'],
        ':attendance' => $rsvp['attendance'],
        ':with_partner' => $rsvp['with_partner'] ? 1 : 0,
        ':partner_name' => $rsvp['partner_name'],
        ':with_kids' => $rsvp['with_kids'] ? 1 : 0,
        ':children' => json_encode($rsvp['children'], JSON_UNESCAPED_UNICODE),
        ':has_car' => $rsvp['has_car'] ? 1 : 0,
        ':has_free_seats' => $rsvp['has_free_seats'] ? 1 : 0,
        ':free_seats_count' => $rsvp['free_seats_count'],
        ':comment' => $rsvp['comment'],
        ':message' => $rsvp['message'],
        ':raw_payload' => json_encode($rsvp['raw_payload'], JSON_UNESCAPED_UNICODE),
    ]);

    return [
        'id' => (int) $pdo->lastInsertId(),
        'guest_name' => $rsvp['name'],
        'attendance' => $rsvp['attendance'],
    ];
}

/**
 * @param array<string, mixed> $extra
 */
function respond(int $status, bool $success, ?string $error = null, ?string $code = null, array $extra = []): never
{
    http_response_code($status);

    $body = ['success' => $success] + $extra;
    if ($error !== null) {
        $body['error'] = $error;
    }
    if ($code !== null) {
        $body['code'] = $code;
    }

    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
