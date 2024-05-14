import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Newscard({ contents }: { contents: ContentProps[] }) {
  return (
    <>
      <div className="sm:m-10 sm:grid sm:grid-cols-3 sm:gap-4 ">
        {contents.map(
          (content: ContentProps, index: number) =>
            index >= 0 &&
            index < 3 && (
              <Card className="m-2  hover:bg-slate-100">
                <CardHeader className="grid place-items-center">
                  <img
                    className="  w-full h-fit transition-all duration-300 rounded-lg mt-2  "
                    src={content.imageurl}
                    alt="image description"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-center">{content.Title}</CardTitle>
                </CardContent>
                <CardFooter className="text-center">
                  <CardDescription className="text-center">
                    {content.Summary}
                  </CardDescription>
                </CardFooter>
              </Card>
            )
        )}
      </div>
    </>
  );
}

interface ContentProps {
  Title: string;
  Summary: string;
  imageurl: string;
}
