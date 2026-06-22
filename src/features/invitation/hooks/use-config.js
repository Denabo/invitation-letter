import staticConfig from "@/config/config";

/**
 * Access the static wedding configuration for this single invitation site.
 *
 * @returns {object} Wedding configuration data
 */
export function useConfig() {
  return staticConfig.data;
}
