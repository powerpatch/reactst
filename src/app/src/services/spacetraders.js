import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spacetradersApi = createApi({
    reducerPath: 'spacetradersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacetraders.io/v2/' }),
    tagTypes: ['Status', 'Leaderboards', 'Stats', 'Announcements'],
    endpoints: (builder) => ({
        getStatus: builder.query({
            query: () => '',
            providesTags: ['Status', 'Leaderboards', 'Stats', 'Announcements'],
        }),
        getFactions: builder.query({
            query: (params) => `factions${params ? '?'.concat(new URLSearchParams(params).toString()) : ''}`,
        }),
        getSystems: builder.query({
            query: (params) => `systems${params ? '?'.concat(new URLSearchParams(params).toString()) : ''}`,
        }),
        postRegister: builder.mutation({
            query: (params) => ({
                url: '/register',
                method: 'POST',
                body: params,
            }),
        }),
    }),
});

export const { useGetStatusQuery, useLazyGetFactionsQuery, useLazyGetSystemsQuery, usePostRegisterMutation } = spacetradersApi;
