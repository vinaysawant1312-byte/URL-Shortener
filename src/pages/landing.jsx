import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const Landing = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold ">
        The Only URL Shortener <br /> you'll ever need! 👇
      </h2>
      <form className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 ">
        <Input
          type="url"
          placeholder="Enter your loooooong url"
          className="h-full flex-1 py-4 px-4"
        />
        <Button variant="destructive">Shorten!</Button>
      </form>
      <img src="/banner.png" alt="banner" className="w-full my-11 md : px-11" />
      <Accordion type="multiple " collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Landing;
