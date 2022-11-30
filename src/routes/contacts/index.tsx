import { component$, Resource } from "@builder.io/qwik"
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import { Contact, CONTACTS } from "./fake-db";

export const onGet: RequestHandler<Contact[]> = async () => {
    /**
     * Fun Fact
     * in Qwik, async and awaits can be used nearly anywhere.
     * return await Promise.resolve(CONTACTS)
     */
    return await Promise.resolve(CONTACTS);
};

/**
 * When doing SSR, onPending is not necessary bc
 * the server will not send back the response HTML
 * until it has finished resolving.
 */
export default component$(() => {
    const endpoint = useEndpoint<typeof onGet>();
    const filter = {
        value: ""
    };
    return (
        <div>
      <h1>
        Contacts
      </h1>
      <input 
        placeholder="Search"
        onInput$={(event) => {
            filter.value = (event.target as HTMLInputElement).value
        }}
        />
        
      {filter.value}
      <Resource value={endpoint}
        onPending={() => <div>loading...</div>}
        onResolved={(contacts) => {
            return (
            <ul>
                {
                    contacts
                    .filter((c) => {
                        // TODO - FIX FILTER LOGIC
                        return c.name.includes(filter.value);
                    })
                    .map((contact) => <li>{contact.name}</li>)
                }
            </ul>)
        }}
        />
      </div>
    );
})