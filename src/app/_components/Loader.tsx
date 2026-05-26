import Footer from '@components/Footer';
import Navigation from '@components/Navigation';

const Loader = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 items-center justify-center">
        <div className="flex items-center justify-center gap-4">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
          <h1 className="text-3xl font-bold">Loading...</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Loader;
