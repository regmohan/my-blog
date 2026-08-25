import Image from "next/image";

export default function Gallery() {
  // Sample gallery items - you can add your images later
  const galleryItems = [
    {
      id: 1,
      title: "Professional Photo 1",
      description: "Portfolio image",
      category: "Photo",
      image: "/gallery/IMG_3431.JPG",
    },
    {
      id: 2,
      title: "Professional Photo 2",
      description: "Portfolio image",
      category: "Photo",
      image: "/gallery/IMG_3433.JPG",
    },
    {
      id: 3,
      title: "Coming Soon",
      description: "More photos coming",
      category: "Placeholder",
      image: null,
    },
    {
      id: 4,
      title: "Coming Soon",
      description: "More photos coming",
      category: "Placeholder",
      image: null,
    },
    {
      id: 5,
      title: "Coming Soon",
      description: "More photos coming",
      category: "Placeholder",
      image: null,
    },
    {
      id: 6,
      title: "Coming Soon",
      description: "More photos coming",
      category: "Placeholder",
      image: null,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <div className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
              Gallery
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              A glimpse into my work, experiences, and achievements
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                {/* Image Placeholder */}
                <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-900 dark:to-blue-700 flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 transition-all relative overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="text-white text-center">
                      <div className="text-5xl mb-2">🖼️</div>
                      <p className="text-sm font-medium">Coming Soon</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                      {item.title}
                    </h3>
                    <span className="text-xs font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Add Images Section */}
          <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-4">
                Ready to add your gallery images?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
                Add your professional photos and project images to showcase your work and experiences.
              </p>
              <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <p>📁 Place images in: <code className="bg-white dark:bg-zinc-900 px-2 py-1 rounded">/public/gallery/</code></p>
                <p>💾 Update gallery items in the page code</p>
                <p>🎨 Each image will be automatically optimized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
