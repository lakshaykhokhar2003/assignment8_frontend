import {getEvent} from "@/actions/eventActions";
import SingleEvent from "@/components/events/SingleEvent";

type Params = Promise<{ id: string }>

const Page = async (props: {params: Params}) => {
    const params = await props.params
    const res = await getEvent(params.id)
    return <SingleEvent event={res?.data} />
};

export default Page;
