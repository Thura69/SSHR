import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';

// Custom SVG components
const EmptyStar = ({ size }: { size: string }) => (
  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.43784 3.56755C7.57781 1.52252 8.14778 0.5 8.99999 0.5C9.8522 0.5 10.4222 1.52251 11.5621 3.56754L11.857 4.09661C12.181 4.67774 12.3429 4.96832 12.5956 5.16004C12.8481 5.35175 13.1626 5.42292 13.7917 5.56525L14.3644 5.69483C16.5781 6.19571 17.685 6.44615 17.9483 7.29297C18.2117 8.13975 17.4571 9.0222 15.9479 10.7869L15.5575 11.2435C15.1286 11.745 14.9142 11.9957 14.8177 12.3059C14.7213 12.6162 14.7537 12.9507 14.8185 13.6199L14.8775 14.229C15.1057 16.5836 15.2198 17.7609 14.5304 18.2842C13.8409 18.8076 12.8046 18.3304 10.7319 17.3761L10.1956 17.1291C9.60668 16.858 9.3122 16.7223 8.99999 16.7223C8.68778 16.7223 8.3933 16.858 7.80434 17.1291L7.26812 17.3761C5.19541 18.3304 4.15906 18.8076 3.46963 18.2842C2.78021 17.7609 2.89429 16.5836 3.12246 14.229L3.18148 13.6199C3.24632 12.9507 3.27874 12.6162 3.18227 12.3059C3.08581 11.9957 2.87139 11.745 2.44253 11.2435L2.05209 10.7869C0.542926 9.0222 -0.21166 8.13975 0.0516797 7.29297C0.315019 6.44615 1.42187 6.19571 3.63558 5.69483L4.2083 5.56525C4.83736 5.42292 5.15189 5.35175 5.40444 5.16004C5.65699 4.96832 5.81897 4.67775 6.14292 4.09661L6.43784 3.56755Z" fill="#FCB904"/>
  </svg>
);

const FilledStar = ({ size }: { size: string }) => (
  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.43784 3.56755C7.57781 1.52252 8.14778 0.5 8.99999 0.5C9.8522 0.5 10.4222 1.52251 11.5621 3.56754L11.857 4.09661C12.181 4.67774 12.3429 4.96832 12.5956 5.16004C12.8481 5.35175 13.1626 5.42292 13.7917 5.56525L14.3644 5.69483C16.5781 6.19571 17.685 6.44615 17.9483 7.29297C18.2117 8.13975 17.4571 9.0222 15.9479 10.7869L15.5575 11.2435C15.1286 11.745 14.9142 11.9957 14.8177 12.3059C14.7213 12.6162 14.7537 12.9507 14.8185 13.6199L14.8775 14.229C15.1057 16.5836 15.2198 17.7609 14.5304 18.2842C13.8409 18.8076 12.8046 18.3304 10.7319 17.3761L10.1956 17.1291C9.60668 16.858 9.3122 16.7223 8.99999 16.7223C8.68778 16.7223 8.3933 16.858 7.80434 17.1291L7.26812 17.3761C5.19541 18.3304 4.15906 18.8076 3.46963 18.2842C2.78021 17.7609 2.89429 16.5836 3.12246 14.229L3.18148 13.6199C3.24632 12.9507 3.27874 12.6162 3.18227 12.3059C3.08581 11.9957 2.87139 11.745 2.44253 11.2435L2.05209 10.7869C0.542926 9.0222 -0.21166 8.13975 0.0516797 7.29297C0.315019 6.44615 1.42187 6.19571 3.63558 5.69483L4.2083 5.56525C4.83736 5.42292 5.15189 5.35175 5.40444 5.16004C5.65699 4.96832 5.81897 4.67775 6.14292 4.09661L6.43784 3.56755Z" fill="#D1D1D1"/>
  </svg>
);

interface DateEmployeeSelect {
  translation: string;
  nuqsField: string;
  value: any;
  setValue: any;
  title: string;
  fieldName: 'rating';
}

const StarFieldSelect: React.FC<DateEmployeeSelect> = ({
  translation,
  nuqsField,
  value,
  setValue,
  fieldName,
  title,
}) => {
  const { t } = useTranslation(translation);
  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const onPointerEnter = () => console.log('Enter');
  const onPointerLeave = () => console.log('Leave');
  const onPointerMove = (value: number, index: number) => console.log(value, index);

  return (
    <section
      className={cn(
        'w-full sm:w-[172px] duration-600 animate-fade-item flex flex-col gap-2 h-[63px]',
      )}
    >
      <p className="font-[400] text-[14px] text-sideMenuTextColor2">
        {t(`${fieldName}`)}
      </p>
      <Rating
        emptyIcon={<FilledStar size='50'/>}
        fillIcon={<EmptyStar  size="50" />}
        SVGstyle={{  width: '30px', direction: 'ltr',verticalAlign:"middle" }}
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
      />
    </section>
  );
};

export default StarFieldSelect;
