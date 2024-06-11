import * as Lucide from 'lucide-react';
import { Badge } from '../ui/badge';

const TextOnly = ({ children }: { children: any }) => {
  return <Badge variant={'secondary'}>{children}</Badge>;
};
export const FacilityBadge = ({
  icon,
  text,
}: {
  icon: boolean;
  text: string;
}) => {
  switch (text) {
    case 'Wifi':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Wifi className="p-1"></Lucide.Wifi> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Workspace':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.MonitorSpeaker className="p-1"></Lucide.MonitorSpeaker>{' '}
              {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );

    case 'Eating utensils':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Utensils className="p-1"></Lucide.Utensils> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Kitchen':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.CookingPot className="p-1"></Lucide.CookingPot> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Fridge':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Refrigerator className="p-1"></Lucide.Refrigerator> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );

    case 'Microwave':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Microwave className="p-1"></Lucide.Microwave> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Pool':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Waves className="p-1"></Lucide.Waves> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Gym':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Dumbbell className="p-1"></Lucide.Dumbbell> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Parking area':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.CarFront className="p-1"></Lucide.CarFront> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'TV':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Tv className="p-1"></Lucide.Tv> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Room services':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Bed className="p-1"></Lucide.Bed> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Washing machine':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.WashingMachine className="p-1"></Lucide.WashingMachine>{' '}
              {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Air Conditioner':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.AirVent className="p-1"></Lucide.AirVent> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Bathtub':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Bath className="p-1"></Lucide.Bath> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'Hot water':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.ShowerHead className="p-1"></Lucide.ShowerHead> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );

    case 'Drinking water':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.GlassWater className="p-1"></Lucide.GlassWater> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );

    case 'Outdoor area':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Trees className="p-1"></Lucide.Trees> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
    case 'CCTV camera':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Cctv className="p-1"></Lucide.Cctv> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );

    case 'Safebox':
      return (
        <div>
          {icon ? (
            <div className="flex items-center font-medium text-stone-600">
              <Lucide.Vault className="p-1"></Lucide.Vault> {text}
            </div>
          ) : (
            <TextOnly>{text}</TextOnly>
          )}
        </div>
      );
  }

  return <div></div>;
};
