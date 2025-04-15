# GitHub Image Uploader

A modern Next.js application that allows users to upload images directly to a GitHub repository using the GitHub API. The application features a beautiful UI with drag-and-drop support, image preview, and real-time feedback.

## Features

- 🖼️ Upload images directly to GitHub repositories
- 👀 Image preview before upload
- 📏 File size validation (5MB limit)
- 🎯 File type validation (images only)
- 🎨 Beautiful UI with Tailwind CSS
- 🔄 Real-time upload status
- 🔗 Direct links to uploaded images
- 🔒 Secure GitHub token handling

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- A GitHub account
- A GitHub Personal Access Token with `repo` scope

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/DaliGabriel/GitHubImageUpload.git
   cd GitHubImageUpload
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a GitHub Personal Access Token**
   - Go to GitHub Settings > Developer Settings > Personal Access Tokens
   - Click "Generate new token"
   - Give it a name (e.g., "Image Uploader")
   - Select the `repo` scope
   - Copy the generated token

4. **Configure environment variables**
   Create a `.env.local` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_GITHUB_OWNER=your-github-username
   NEXT_PUBLIC_GITHUB_REPO=your-repo-name
   NEXT_PUBLIC_GITHUB_TOKEN=your-github-personal-access-token
   ```
   Replace the placeholder values with your actual GitHub information.

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Visit `http://localhost:3000` to see the application in action.

## Project Structure

```
GitHubImageUpload/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── upload/
│   │   │       └── route.ts      # API route for handling uploads
│   │   └── page.tsx              # Main page component
│   ├── components/
│   │   └── ImageUploader.tsx     # Upload component with UI
│   ├── lib/
│   │   └── utils/
│   │       └── githubImageUpload.ts  # GitHub upload utility
│   └── types/
│       └── githubImageUploader.ts    # TypeScript interfaces
├── .env.local                    # Environment variables
├── package.json                  # Project dependencies
└── README.md                     # Project documentation
```

## How It Works

1. The `ImageUploader` component provides a user interface for selecting and previewing images.
2. When a user selects an image, it's validated for type and size.
3. The image is sent to the `/api/upload` endpoint.
4. The API route uses the GitHub uploader utility to:
   - Convert the image to base64
   - Upload it to the specified GitHub repository
   - Return the raw GitHub URL of the uploaded image
5. The UI displays the uploaded image URL and provides a direct link.

## Security Considerations

- The GitHub token is stored in environment variables and never exposed to the client
- File type validation prevents non-image uploads
- File size limits prevent large uploads
- All sensitive information is kept in `.env.local` which is git-ignored

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Octokit](https://github.com/octokit/octokit.js) - GitHub API client
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
