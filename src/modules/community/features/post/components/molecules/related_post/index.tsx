import { CompactPost } from "~/modules/community/components/molecules";

const legalPostRelated = [
  {
    avatar:
      "https://images.pexels.com/photos/12396627/pexels-photo-12396627.jpeg",
    username: "Rafael Aguirre",
    idUser: "user",
    idPost: "post",
    likes: 8,
    comments: 10,
    post: "Problemas actuales acerca de las herencias",
  },
  {
    avatar: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg",
    username: "Laura Quiñonez",
    idUser: "user",
    idPost: "post",
    likes: 22,
    comments: 8,
    post: "La cruda sin embargo realidad sobre los accidentes de tráfico",
  },
  {
    avatar:
      "https://images.pexels.com/photos/3182739/pexels-photo-3182739.jpeg",
    username: "Mario Espinoza",
    idUser: "user",
    idPost: "post",
    likes: 56,
    comments: 98,
    post: "Las nuevas estafas bancarias que te pueden suceder",
  },
  {
    avatar:
      "https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg",
    username: "Camila Fernández",
    idUser: "user",
    idPost: "post",
    likes: 15,
    comments: 5,
    post: "Dudas comunes sobre el derecho laboral y despidos injustificados",
  },
  {
    avatar:
      "https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg",
    username: "Carlos Moreno",
    idUser: "user",
    idPost: "post",
    likes: 30,
    comments: 12,
    post: "El impacto de las nuevas regulaciones fiscales en emprendedores",
  },
  {
    avatar:
      "https://images.pexels.com/photos/5668778/pexels-photo-5668778.jpeg",
    username: "Diana Ríos",
    idUser: "user",
    idPost: "post",
    likes: 78,
    comments: 23,
    post: "Custodia de menores: Lo que todo padre debe saber",
  },
  {
    avatar:
      "https://images.pexels.com/photos/5680213/pexels-photo-5680213.jpeg",
    username: "Luis Méndez",
    idUser: "user",
    idPost: "post",
    likes: 44,
    comments: 19,
    post: "Diferencias entre fraude y abuso de confianza en el código penal",
  },
  {
    avatar:
      "https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg",
    username: "Elena Gutiérrez",
    idUser: "user",
    idPost: "post",
    likes: 92,
    comments: 30,
    post: "Cómo proteger tu identidad en el mundo digital",
  },
  {
    avatar:
      "https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg",
    username: "Fernando López",
    idUser: "user",
    idPost: "post",
    likes: 51,
    comments: 14,
    post: "Lo que debes saber sobre contratos de alquiler y desahucios",
  },
  {
    avatar:
      "https://images.pexels.com/photos/7875999/pexels-photo-7875999.jpeg",
    username: "Andrea Velasco",
    idUser: "user",
    idPost: "post",
    likes: 63,
    comments: 27,
    post: "Violencia de género y medidas legales de protección",
  },
];

export const RelatedPost = () => {
  return (
    <div className="px-4 py-2 bg-white rounded-lg w-full h-fit shadow-sm hover:shadow-md transition-all">
      <div className="grid divide-y  pb-4">
        {legalPostRelated.map((item, idx) => (
          <CompactPost
            key={idx}
            avatar={item.avatar}
            username={item.username}
            idPost={item.idPost}
            idUser={item.idUser}
            likes={item.likes}
            comments={item.comments}
            post={item.post}
          />
        ))}
      </div>
    </div>
  );
};
