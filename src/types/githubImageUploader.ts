export interface GitHubImageUploadConfig {
  owner: string;
  repo: string;
  token: string;
  branch?: string;
  defaultPath?: string;
}

export interface UploadImageParams {
  imageBuffer: Buffer;
  filename: string;
  path?: string;
}
