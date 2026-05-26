import Image from 'next/image';

const Hero = () => {
  return (
    <div className="my-16 flex flex-col items-center justify-between gap-8 sm:my-24 md:my-40 md:flex-row">
      <div className="flex flex-col items-start justify-center gap-12">
        <h1 className="text-3xl font-semibold sm:text-4xl md:text-6xl">
          Welcome to my website!
        </h1>
        <p className="max-w-2xl text-left text-base sm:text-lg md:text-2xl">
          I&apos;m David acevski, a student at FCSE who&apos;s passionate about
          technology and networking. Here you can learn more about me and see my
          projects.
        </p>
      </div>
      <div className="w-full max-w-xs shrink-0 sm:max-w-sm md:max-w-md">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={450}
          height={350}
          sizes="(max-width: 640px) 100vw, 450px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
};

export default Hero;
