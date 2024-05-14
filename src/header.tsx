import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Header({ content }: { content: ContentProps }) {
  return (
    <>
      <Card className="col-span-3  hover:bg-slate-100 p-3">
        <div className="grid  place-items-center ">
          <img
            className=" h-fit w-full transition-all duration-300 rounded-lg sm:mt-10  "
            src={content.imageurl}
            alt="image description"
          />
        </div>
        <CardHeader>
          <CardTitle className=" text-center sm:text-4xl">
            {content.Title}
          </CardTitle>
        </CardHeader>
        <CardDescription className="text-center sm:text-xl">
          {content.Summary}
        </CardDescription>
      </Card>
    </>
  );
}
interface ContentProps {
  Title: string;
  Summary: string;
  imageurl: string;
}
