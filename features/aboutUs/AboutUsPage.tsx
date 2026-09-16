const AboutUsPage = () => {
  return (
    <div className="mx-4 flex h-[calc(100dvh-155px)] flex-wrap items-center justify-center gap-6 md:mx-10 md:gap-10 lg:h-[calc(100dvh-185px)]">
      {/* body */}

      <div className="flex flex-row md:flex-col">
        {/* first slide */}
        <div className="flex items-center justify-between">
          {/* image */}

          <img
            src="/images/dummbles10.jpeg"
            className="hidden max-h-160 w-full rounded-[65px] object-cover object-left shadow-[0_0_15px] shadow-[#FEFEFE] md:block"
          />

          {/* text */}

          <div className="flex flex-col gap-15 md:ml-20">
            <div className="flex flex-col gap-4 md:gap-10">
              <div className="text-primary text-2xl md:text-4xl">
                OUR MESSION
              </div>
              <div className="flex flex-col gap-7 md:gap-15">
                <div className="text-sm md:text-lg">
                  Founded in 2024,
                  <span className="text-secondary"> ZEKA SPORTS </span>
                  started with a single goal: to provide high-quality equipment
                  to athletes who are passionate about their craft. We believe
                  that the right gear shouldn't just fit you; it should inspire
                  you.
                </div>

                <div className="flex gap-2 md:gap-10">
                  <div className="border-primary flex flex-col gap-2 border-l-2 pl-2">
                    <div className="text-primary">Durability</div>
                    <div className="text-xs">
                      Built to last the toughest training sessions.
                    </div>
                  </div>

                  <div className="border-primary flex flex-col gap-2 border-l-2 pl-2">
                    <div className="text-primary">Innovation</div>
                    <div className="text-xs">
                      Constantly refining materials and design.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUsPage;
