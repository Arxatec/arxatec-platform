import { LegalDisclamer } from "~/modules/community/components/atoms";
import { Comments, CommunityCard, Post, RelatedPost } from "../molecules/";

export default function PostPage() {
  return (
    <div className="w-full max-w-5xl h-full mx-auto">
      <div className="grid grid-cols-[69.7%_30%] gap-2 justify-between">
        <div className="">
          <Post />
          <Comments />
        </div>
        <div className="">
          <RelatedPost />
          <CommunityCard
            name="Derebro Laboral"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            memberCount={"100"}
            onlineCount={"50"}
          />
          <LegalDisclamer />
        </div>
      </div>
    </div>
  );
}
