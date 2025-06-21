import Image from "next/image";
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                M
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800"></div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Muditya
              </h1>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">
                Full Stack Developer
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 max-w-2xl">
                Passionate developer crafting digital experiences with modern technologies. 
                I love building scalable applications and exploring new tech stacks. 
                Currently focused on React, Next.js, and cloud technologies.
              </p>

              <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Python'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-6">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  <Download className="w-4 h-4" />
                  Download CV
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors">
                  <Mail className="w-4 h-4" />
                  Contact Me
                </button>
              </div>

              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
            <div className="text-slate-600 dark:text-slate-300">Projects Completed</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">3+</div>
            <div className="text-slate-600 dark:text-slate-300">Years Experience</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center shadow-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">15+</div>
            <div className="text-slate-600 dark:text-slate-300">Technologies</div>
          </div>
        </div>
      </div>
    </div>
  );
}
