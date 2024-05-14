import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Topcontents({
  contents,
}: {
  contents: ContentProps[];
}) {
  return (
    <>
      <Card className="justify-center p-2 m-1  sm:m-2">
        <CardHeader>
          <CardTitle className="text-center ">Top Contents</CardTitle>
        </CardHeader>
        {contents.map((content: ContentProps, index: number) => (
          <Card className="m-2 white hover:bg-slate-100" key={index}>
            <CardContent className="pb-0 pl-3 pt-2">
              {content.Title}
            </CardContent>
            <CardDescription className="text-center p-2">
              {content.Summary}
            </CardDescription>
          </Card>
        ))}
      </Card>
    </>
  );
}
interface ContentProps {
  Title: string;
  Summary: string;
}
