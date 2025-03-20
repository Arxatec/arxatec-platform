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
          <div className="mt-2 bg-white rounded-lg w-full h-fit shadow-sm hover:shadow-md transition-all p-4">
            <div className="flex flex-wrap gap-x-4 text-xs text-gray-500">
              <a href="#" className="hover:underline">
                Reglas de Arxatec
              </a>
              <a href="#" className="hover:underline">
                Política de privacidad
              </a>
              <a href="#" className="hover:underline">
                Acuerdo del usuario
              </a>
              <div className="mt-1 w-full">
                <span>
                  Arxatec, Inc. © 2024. Todos los derechos reservados.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
