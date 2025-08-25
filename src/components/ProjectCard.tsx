"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Project = {
  id: number;
  created_at: string;
  title: string;
  description: string | null;
  image_url: string | null;
  project_link: string | null;
  tags: string[] | null;
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isDescriptionLong = project.description && project.description.length > 100;

  return (
    <div className="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg flex flex-col">
      {project.image_url && (
        <Image
          src={project.image_url}
          alt={project.title}
          width={300}
          height={300}
          className="w-full h-full object-cover"
          priority={index < 3}
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex flex-wrap gap-1 mb-2 justify-center md:justify-start">
            {project.tags?.map(tag => (
              <span key={tag} className="bg-pink-600/20 text-pink-300 md:text-xs text-[8px] font-semibold px-2 py-0.5 rounded-full">
                <span className="hidden sm:inline">{tag}</span>
              </span>
            ))}
          </div>
          <h3 className="md:text-lg text-sm font-bold text-white mb-1 text-center md:text-left">{project.title}</h3>

          <p className={`text-sm text-indigo-200 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
            {project.description}
          </p>

          {isDescriptionLong && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-pink-400 text-sm font-semibold mt-2 hover:text-pink-300"
            >
              {isExpanded ? 'Sembunyikan' : 'Lihat Selengkapnya'}
            </button>
          )}
        </div>
        
        <div className="mt-4 text-center">
          {project.project_link && (
            <Link 
              href={project.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-pink-600 text-white font-semibold px-3 py-1.5 text-sm rounded-lg transition-transform transform hover:bg-pink-700 hover:scale-105 shadow-lg"
            >
              Lihat Projek
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}