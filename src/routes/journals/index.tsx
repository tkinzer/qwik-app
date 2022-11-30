import { component$, Resource } from "@builder.io/qwik"
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Journal, JOURNALS } from "./fake-db";

export const onGet: RequestHandler<Journal[]> = async () => {
    /**
     * Fun Fact
     * in Qwik, async and awaits can be used nearly anywhere.
     * return await Promise.resolve(journalS)
     */
    return await Promise.resolve(JOURNALS);
};

/**
 * When doing SSR, onPending is not necessary bc
 * the server will not send back the response HTML
 * until it has finished resolving.
 */
export default component$(() => {
    const endpoint = useEndpoint<typeof onGet>();
    return (
        <div>
      <h1>
        Journal
      </h1>
      <Resource value={endpoint}
        onPending={() => <div>loading...</div>}
        onResolved={(journals) => {
            return (
            <ul>
                {
                    journals.map((journal) => <li>{journal.name}</li>)
                }
            </ul>)
        }}
        />
      </div>
    );
})