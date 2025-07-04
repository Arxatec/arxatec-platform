import { LegalDisclamer } from "~/modules/shared/community/components/atoms";
import { Comments, CommunityCard, Post, RelatedPost } from "../molecules/";
import { useTitle } from "~/hooks/useTitle";
import { useEffect } from "react";

export default function PostPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Publicación - Arxatec");
  }, []);

  return (
    <div className="w-full max-w-5xl h-full mx-auto min-h-screen">
      <div className="grid grid-cols-[69.7%_30%] gap-2 justify-between">
        <div className="">
          <Post />
          <Comments />
        </div>
        <div>
          <RelatedPost />
          <CommunityCard
            name="Derebro Laboral"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            memberCount={"100"}
            onlineCount={"50"}
          />
          <div className="mt-2">
            <LegalDisclamer />
          </div>
        </div>
      </div>
    </div>
  );
}
