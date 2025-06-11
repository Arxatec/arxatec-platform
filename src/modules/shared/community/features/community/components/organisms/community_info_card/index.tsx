import { useState } from "react";
import {
  CalendarIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { CustomAvatar, PrimaryButton } from "~/components/atoms";

interface CommunityMarker {
  title: string;
}

interface UserTag {
  name: string;
  color: string;
}

interface CommunityRule {
  number: number;
  title: string;
  description: string;
}

interface CommunityModerator {
  username: string;
  avatar: string;
  description?: string;
  isCreator?: boolean;
  tag?: string;
}

interface Props {
  title: string;
  description: string;
  creationDate: string;
  isPublic?: boolean;
  memberCount: string;
  onlineCount: string;
  topPercentage?: string;
  currentlyDebating?: boolean;
  communityMarkers?: CommunityMarker[];
  rules?: CommunityRule[];
  moderators?: CommunityModerator[];
}

export const CommunityInfoCard: React.FC<Props> = ({
  title,
  description,
  creationDate,
  isPublic = true,
  memberCount,
  onlineCount,
  topPercentage,
  currentlyDebating = false,
  communityMarkers = [],
  rules = [],
  moderators = [],
}) => {
  const [expandedRules, setExpandedRules] = useState<number[]>([]);

  const toggleRule = (ruleNumber: number) => {
    if (expandedRules.includes(ruleNumber)) {
      setExpandedRules(expandedRules.filter((num) => num !== ruleNumber));
    } else {
      setExpandedRules([...expandedRules, ruleNumber]);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all h-fit">
      {/* Header */}
      <div className="p-4 rounded-t-lg">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      {/* Creation info */}
      <div className="px-4">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>Creada el {creationDate}</span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <GlobeAltIcon className="h-4 w-4 mr-1" />
          <span>{isPublic ? "Público" : "Privado"}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 border-b border-b-gray-100">
        <div className="flex justify-between mb-2">
          <div>
            <div className="text-base font-bold text-gray-900">
              {memberCount}
            </div>
            <div className="text-xs text-gray-500">miembros</div>
          </div>
          <div>
            <div className="text-base font-bold text-gray-900">
              {onlineCount}
            </div>
            <div className="text-xs text-gray-500">en línea</div>
          </div>
          {topPercentage && (
            <div>
              <div className="text-base font-bold text-gray-900">
                Top {topPercentage}
              </div>
              <div className="text-xs text-gray-500">clasificar por tamaño</div>
            </div>
          )}
        </div>
        {currentlyDebating && (
          <div className="flex items-center text-xs text-green-600">
            <CheckCircleIcon className="size-4 mr-1" />
            <span>currently debating</span>
          </div>
        )}
      </div>

      {/* Community markers */}
      {communityMarkers.length > 0 && (
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-xs font-medium text-gray-500 uppercase mb-2">
            Marcadores de comunidad
          </h3>
          <div className="space-y-1">
            {communityMarkers.map((marker, index) => (
              <PrimaryButton
                key={index}
                className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-gray-800 text-xs tracking-wider font-semibold rounded-md flex items-center justify-center"
              >
                {marker.title}
              </PrimaryButton>
            ))}
          </div>
        </div>
      )}

      {/* Rules section */}
      {rules.length > 0 && (
        <div className="px-2 py-4 border-b border-gray-100">
          <h3 className="text-xs font-medium text-gray-500 uppercase mb-2 px-2">
            Reglas
          </h3>
          <div className="">
            {rules.map((rule) => (
              <div key={rule.number} className="overflow-hidden">
                <div
                  className="flex items-center justify-between p-3 cursor-pointer transition bg-white hover:bg-slate-50"
                  onClick={() => toggleRule(rule.number)}
                >
                  <div className="flex items-start flex-1 mr-4">
                    <span className="text-sm text-gray-600 mr-2 flex-shrink-0">
                      {rule.number}
                    </span>
                    <span className="text-sm text-gray-600">{rule.title}</span>
                  </div>
                  <div className="flex-shrink-0">
                    {expandedRules.includes(rule.number) ? (
                      <ChevronUpIcon
                        className="h-4 w-4 text-gray-800"
                        strokeWidth={2}
                      />
                    ) : (
                      <ChevronDownIcon
                        className="h-4 w-4 text-gray-800"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                </div>
                {expandedRules.includes(rule.number) && (
                  <div className="pl-7 pr-3 pb-3 bg-white">
                    <p className="text-sm text-gray-500">{rule.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Moderators section */}
      {moderators.length > 0 && (
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">
            Moderadores
          </h3>

          <PrimaryButton className="w-full py-2.5 mb-3 bg-slate-50 hover:bg-slate-100 text-gray-800 text-sm font-medium rounded flex items-center justify-center">
            <EnvelopeIcon className="h-4 w-4 mr-2" />
            <span>Enviar mensaje a moderadores</span>
          </PrimaryButton>

          <div className="space-y-3">
            {moderators.map((mod, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                  <CustomAvatar
                    username={mod.username}
                    avatar={mod.avatar || "/placeholder.svg"}
                    size="2rem"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {mod.username}
                    </span>
                    {mod.isCreator && (
                      <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        creator
                      </span>
                    )}
                    {mod.tag && (
                      <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {mod.tag}
                      </span>
                    )}
                  </div>
                  {mod.description && (
                    <span className="text-xs text-gray-500">
                      {mod.description}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          {moderators.length > 5 && (
            <button className="w-full py-2 mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded flex items-center justify-center">
              <span>Ver todos los moderadores</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
