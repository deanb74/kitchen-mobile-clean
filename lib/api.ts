export const API_BASE_URL_ENV_VAR = "EXPO_PUBLIC_API_BASE_URL";

export function normalizeApiBaseUrl(input: string): string {
	const trimmed = input.trim();

	if (!trimmed) {
		throw new Error(
			`${API_BASE_URL_ENV_VAR} must be configured as a non-empty HTTP or HTTPS URL.`,
		);
	}

	let parsed: URL;

	try {
		parsed = new URL(trimmed);
	} catch {
		throw new Error(
			`${API_BASE_URL_ENV_VAR} must be a valid HTTP or HTTPS URL. Received: ${JSON.stringify(input)}.`,
		);
	}

	if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
		throw new Error(
			`${API_BASE_URL_ENV_VAR} must use the http or https protocol. Received: ${parsed.protocol}.`,
		);
	}

	const normalizedPathname = parsed.pathname.replace(/\/+$/, "") || "/";
	parsed.pathname = normalizedPathname;

	const normalized = parsed.toString().replace(/\/+$/, "");

	return normalized;
}

export function resolveApiBaseUrl(env: NodeJS.ProcessEnv = process.env): string {
	return normalizeApiBaseUrl(env[API_BASE_URL_ENV_VAR] ?? "");
}

export const API_BASE_URL = resolveApiBaseUrl();
