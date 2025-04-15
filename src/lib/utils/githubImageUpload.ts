import { Octokit } from "@octokit/rest";
import {
  GitHubImageUploadConfig,
  UploadImageParams,
} from "../../types/githubImageUploader";

const createGitHubUploader = (config: GitHubImageUploadConfig) => {
  const {
    owner,
    repo,
    token,
    branch = "main",
    defaultPath = "images/blog",
  } = config;

  const octokit = new Octokit({ auth: token });

  const buildPath = (basePath: string, filename: string): string => {
    return `${basePath.replace(/^\/+|\/+$/g, "")}/${filename}`;
  };

  const buildRawUrl = (path: string): string => {
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  };

  const uploadImage = async ({
    imageBuffer,
    filename,
    path = defaultPath,
  }: UploadImageParams): Promise<string> => {
    try {
      const uploadPath = buildPath(path, filename);
      const content = imageBuffer.toString("base64");

      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: uploadPath,
        message: `Upload image: ${filename}`,
        content,
        branch,
      });

      return buildRawUrl(uploadPath);
    } catch (error) {
      throw new Error(
        `Failed to upload image '${filename}': ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return {
    uploadImage,
  };
};

export default createGitHubUploader;
