'use strict';

define(['angular'],
    function (angular) {      
        return {
            httpVerb: { GET: 'GET', POST: 'POST', DELETE: 'DELETE', PUT: 'PUT' },
            reportingApi: {
                properties: '/api/properties/',
                propertySummary: '/report/classified/property-summary',
                dailyActivity: '/report/classified/daily-activity',
                postings: '/report/classified/postings',
                postingTitles: '/report/classified/posting-titles',
                postingDescription: '/report/classified/posting-descriptions',
                postingTimes: '/report/classified/posting-times'
            },
            groupingApi: {
                groups: '/groups/',
                dailyActivity: '/classified/report/daily-activity?',
                companyContacts: '/api/contacts/company/'
            }

        };
    });