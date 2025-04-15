import "./App.css";

import NotFound from "./NotFound";
import CountriesList from "./components/CountriesList";
import CountryView from "./components/CountryView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<CountriesList />} />
                    <Route path="/:id" element={<CountryView />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
        // <>
        //   <UserList/>
        // </>
    );
}

export default App;
