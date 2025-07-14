import { CheckCircle2Icon, Github, Twitter } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./Alert";

export function DeFiAlert() {
  return (
    <div className="mb-8">
      <Alert className="border border-border/30 rounded-2xl shadow-xl p-6 bg-indigo-50 dark:bg-indigo-900/20 transition hover:scale-[1.02]">
      <div className="flex items-start gap-4">
          <CheckCircle2Icon className="text-green-600 w-6 h-6 flex-shrink-0 mt-1" />
          <div>
            <AlertTitle className="font-semibold text-xl bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              I am a AI Researcher.<br />interested in Autonomous Weapons | Diplomacy.
            </AlertTitle>
            <AlertDescription>
            
              <div className="flex items-center gap-5 mt-3">
                <a
                  href="https://x.com/Muditya_DeFi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-700 underline hover:text-blue-900 transition transform hover:scale-105"
                >
                  <Twitter className="w-5 h-5" /> Twitter
                </a>
                <a
                  href="https://github.com/mudityadefi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-800 underline hover:text-black transition transform hover:scale-105"
                >
                  <Github className="w-5 h-5" /> GitHub
                </a>
              </div>
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
}
