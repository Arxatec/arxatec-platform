import { useState } from "react";
import { CommentForm, CommentItem } from "./components";
import { PrimaryButton } from "~/components/atoms";

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface Comment {
  id: string;
  user: User;
  text: string;
  date: string;
  likes: number;
  dislikes: number;
  replies?: Comment[];
}

const initialComments: Comment[] = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "María García",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "¡Qué buena publicación! Me encantó la información que compartiste.",
    date: "2023-05-15T14:30:00",
    likes: 12,
    dislikes: 1,
  },
  {
    id: "2",
    user: {
      id: "user3",
      name: "Carlos Rodríguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Interesante perspectiva. Me gustaría saber más sobre este tema.",
    date: "2023-05-16T09:20:00",
    likes: 5,
    dislikes: 1,
    replies: [
      {
        id: "3",
        user: {
          id: "user2",
          name: "Ana López",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        text: "¡Gracias por compartir!",
        date: "2023-05-16T10:30:00",
        likes: 3,
        dislikes: 0,
      },
    ],
  },
  {
    id: "4",
    user: {
      id: "user4",
      name: "Luis Fernández",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "No estoy de acuerdo con algunos puntos, pero es una buena discusión.",
    date: "2023-05-17T08:45:00",
    likes: 8,
    dislikes: 2,
  },
  {
    id: "5",
    user: {
      id: "user5",
      name: "Sofía Martínez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Muy interesante, ¿tienes fuentes adicionales para profundizar?",
    date: "2023-05-18T11:10:00",
    likes: 6,
    dislikes: 1,
  },
  {
    id: "6",
    user: {
      id: "user6",
      name: "Diego Ríos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Excelente contenido, lo compartiré con mis amigos.",
    date: "2023-05-19T13:25:00",
    likes: 15,
    dislikes: 0,
  },
  {
    id: "7",
    user: {
      id: "user7",
      name: "Andrea Torres",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Creo que faltó abordar un punto importante, pero en general está bien.",
    date: "2023-05-20T15:50:00",
    likes: 7,
    dislikes: 3,
  },
  {
    id: "8",
    user: {
      id: "user8",
      name: "Fernando Vega",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Muy claro y bien explicado. ¡Gracias!",
    date: "2023-05-21T17:00:00",
    likes: 10,
    dislikes: 1,
  },
  {
    id: "9",
    user: {
      id: "user9",
      name: "Camila Herrera",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "No me convence del todo, pero aprecio el esfuerzo.",
    date: "2023-05-22T19:30:00",
    likes: 4,
    dislikes: 5,
  },
  {
    id: "10",
    user: {
      id: "user10",
      name: "Javier Méndez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Me gustaría ver más contenido como este.",
    date: "2023-05-23T21:15:00",
    likes: 9,
    dislikes: 0,
  },
  {
    id: "11",
    user: {
      id: "user11",
      name: "Paula Díaz",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "El artículo me ayudó mucho, gracias por compartirlo.",
    date: "2023-05-24T10:40:00",
    likes: 14,
    dislikes: 1,
  },
  {
    id: "12",
    user: {
      id: "user12",
      name: "Ricardo Salazar",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    text: "Espero que hagas más publicaciones similares pronto.",
    date: "2023-05-25T12:30:00",
    likes: 11,
    dislikes: 2,
  },
];

export const Comments = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [showForm, setShowForm] = useState(false);

  const addComment = (text: string) => {
    const newComment: Comment = {
      id: `${comments.length + 1}`,
      user: {
        id: "currentUser",
        name: "Tú",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      text,
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };

    setComments([newComment, ...comments]);
  };

  return (
    <div className="w-full mt-2 mx-auto rounded-lg shadow-sm bg-white overflow-hidden h-fit hover:shadow-md transition-all  ">
      <div className="p-4">
        {showForm && (
          <CommentForm
            onSubmit={addComment}
            onClose={() => setShowForm(false)}
          />
        )}
        {!showForm && (
          <PrimaryButton
            className="w-full border text-sm text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => setShowForm(true)}
          >
            Agregar comentario
          </PrimaryButton>
        )}

        <div className="mt-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 rounded-b-lg">
        Los comentarios están ordenados por fecha, los más recientes primero.
      </div>
    </div>
  );
};
