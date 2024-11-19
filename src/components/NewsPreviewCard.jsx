import moment from 'moment';
import Image from 'next/image';

const NewsPreviewCard = ({ article }) => {
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
    <div className="relative overflow-hidden text-white rounded-md">
    <Image
          src={article.urlToImage}
          alt={article.title}
          width={384}
          height={216}
          layout="responsive"
          className="rounded-md"
        />
    </div>
    <div className="p-4">
    <span className="text-sm text-gray-500 dark:text-gray-400">{ moment(article.publishedAt).format("MMMM Do, YYYY h:mm:ss A") }</span>
      
      <h6 className="mb-2 text-slate-800 text-xl font-semibold">
        {article.title}
      </h6>
      <p className="text-slate-600 leading-normal font-light">
        {article.description}
      </p>
    </div>
    <div className="px-4 pb-4 pt-0 mt-2">
    <a target="_blank" href={article.url} rel="noopener noreferrer" className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
        Read More
    </a>
    </div>
  </div>  
  );
};

export default NewsPreviewCard;