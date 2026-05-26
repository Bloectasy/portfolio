import Image from 'next/image';

const Hero = () => {
  return (
    <div className="my-40 flex flex-col items-center justify-between gap-8 md:flex-row">
      <div className="flex flex-col items-start justify-center gap-12">
        <h1 className="text-4xl font-semibold md:text-6xl">
          Welcome to my website!
        </h1>
        <p className="max-w-2xl text-left text-lg md:text-2xl">
          I&apos;m David acevski, a student at FCSE who&apos;s passionate about
          technology and networking. Here you can learn more about me and see my
          projects.
        </p>
      </div>
      <div className="shrink-0">
        <Image src="/images/logo.png" alt="logo" width={450} height={350} />
      </div>
    </div>
  );
};

export default Hero;
