import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { PostActions, PostContent } from "./components";
import { CustomAvatar } from "~/components/atoms";
import { ROUTES } from "~/routes/routes";
import { useNavigate } from "react-router";
import { PostFooter, PostMenu } from "~/modules/community/components/atoms";

export const Post = () => {
  const [upvotes, setUpvotes] = useState(1.7);
  const [commentCount, setCommentCount] = useState(514);
  const navigate = useNavigate();

  const navigateToCommunity = () => {
    navigate(`/${ROUTES.COMMUNITY}`);
  };

  const post = {
    subreddit: "r/Advice",
    timePosted: "hace 1 d",
    username: "Euphoric_Diamond8293",
    title: "I went on a date with this guy",
    content: `I went on a date with this guy that I met on Tinder yesterday and we both go to the same school. When I met him yesterday, I was dressed up, my hair was done, and I was wearing makeup. Today I passed him in the hallway on the way to my first class, I'm wearing all baggy clothes, hair is up, and I'm wearing no makeup. We made eye contact but no one said anything. I immediately felt my heart drop and my face get hot. He texted me good morning (before this happened) but I don't even think I'm going to respond because I just feel like after he saw me he's just not going to want to talk to me anymore. I feel so ugly. I feel like a catfish. I feel so embarrassed. What should I do? Does anyone have any advice?`,
    edit: `Edit: I texted him back and the conversation is going as normally as they have been. I'm still trying to read through all of your comments. Thank you everyone! :)`,
  };

  return (
    <div className="text-gray-900 bg-white rounded-lg shadow-sm overflow-hidden h-fit hover:shadow-md transition-all  ">
      <div className="p-3 flex items-center gap-2">
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={navigateToCommunity}
        >
          <ArrowLeftIcon className="size-5 text-gray-400" />
        </button>

        <CustomAvatar
          size="2.3rem"
          avatar={post.username}
          username={post.username}
        />

        <div className="flex-1">
          <div className="text-sm text-gray-500">
            {post.subreddit} <span className="mx-1">•</span> {post.timePosted}
          </div>
          <div className="text-sm font-medium text-gray-800">
            {post.username}
          </div>
        </div>

        <PostMenu />
      </div>

      <PostContent post={post} />
      <div className="px-4 pb-4">
        <PostFooter likes={100} comments={25} />
      </div>
    </div>
  );
};
