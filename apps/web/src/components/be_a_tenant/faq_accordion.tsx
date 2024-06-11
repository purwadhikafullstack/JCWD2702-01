import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export const FaqAccordion = () => {
  return (
    <Accordion type="single" collapsible className="text-xl w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="">
          Is my place eligible for renting?
        </AccordionTrigger>
        <AccordionContent>
          Roomer guests are interested in all kinds of places. We have listings
          for tiny homes, cabins, treehouses, and more. Even a spare room can be
          a great place to stay.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Do I have to host all the time?</AccordionTrigger>
        <AccordionContent>
          Not at all—you control your calendar. You can host once a year, a few
          nights a month, or more often.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          How much should I interact with guests?
        </AccordionTrigger>
        <AccordionContent>
          It’s up to you. Some Hosts prefer to message guests only at key
          moments—like sending a short note when they check in—while others also
          enjoy meeting their guests in person. You’ll find a style that works
          for you and your guests.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>What is the platform fee?</AccordionTrigger>
        <AccordionContent>
          Roomer typically collects a flat service fee of 3% of the reservation
          subtotal when you get paid. We also collect a fee from guests when
          they book. In many areas, Roomer collects and pays sales and tourism
          taxes automatically on your behalf as well.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
