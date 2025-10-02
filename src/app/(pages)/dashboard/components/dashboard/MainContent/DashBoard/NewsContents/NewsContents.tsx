import { useNews } from "../useNews.Hook";
import NewsTitle from "./NewsTitle";
import NewsContent from "./NewsContent";
import NewsFotter from "./NewsFotter";
import { useAtomValue } from "jotai";
import { selectedDateAtom } from "../../../../../../../store";
import { NewsItem } from "@/types/News.type";
import { Card } from "@/app/(pages)/dashboard/components/ui/card";

const NewsContents = () => {
  const selectedDate = useAtomValue(selectedDateAtom);
  const news: NewsItem[] = useNews(selectedDate);

  if (news.length === 0 && selectedDate) {
    return (
      <div className="col-span-full flex justify-center items-center py-8">
        <p className="text-muted-foreground">
          {selectedDate.toLocaleDateString("ja-JP")}のニュースはありません
        </p>
      </div>
    );
  }

  return (
    <>
      {news.map((news, id) => (
        <Card
          key={id}
          className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border-0 shadow-md bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
          onClick={() => window.open(news.url, "_blank")}
        >
          <NewsTitle news={news} />
          <NewsContent news={news} />
          <NewsFotter news={news} />
        </Card>
      ))}
    </>
  );
};

export default NewsContents;
