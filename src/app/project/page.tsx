import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Chatbox } from '@/components/Chatbox';
import { supabase } from '@/lib/supabase';
import { ProjectCard } from '@/components/ProjectCard';

// Tipe data tetap sama
type Project = {
  id: number;
  created_at: string;
  title: string;
  description: string | null;
  image_url: string | null;
  project_link: string | null;
  tags: string[] | null;
};

// Fungsi getProjects tetap sama
async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error.message);
    return [];
  }

  return data || [];
}

// Komponen Halaman Portofolio Proyek
export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <main>
        <section className="bg-gradient-to-b from-gray-900 to-indigo-900/30 py-10 text-center">
          <div className="container mx-auto px-6">
            <h1 
              className="text-4xl md:text-5xl font-bold animate-fade-in-down"
              style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
            >
              Proyek Selesai
            </h1>
            <p 
              className="mt-4 md:text-lg text-sm text-indigo-200 max-w-2xl mx-auto animate-fade-in-down"
              style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
            >
              Lihat bagaimana kami mengubah ide-ide brilian menjadi solusi digital yang fungsional dan menawan.
            </p>
          </div>
        </section>

        <section className="py-3 bg-indigo-900/20 animate-fade-in-up">
          <div className="container mx-auto px-6">
            {projects.length === 0 ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-indigo-300">Belum Ada Proyek</h2>
                <p className="text-indigo-400 mt-2">Tambah proyek lewat database</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <Chatbox />
    </div>
  );
}