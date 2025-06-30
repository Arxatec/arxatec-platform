export function getFileExtensionFromUrl(url: string): string {
  try {
    const urlWithoutParams = url.split("?")[0];
    const fileName = urlWithoutParams.split("/").pop() || "";
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    return extension;
  } catch {
    return "";
  }
}
