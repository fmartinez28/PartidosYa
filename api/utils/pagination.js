export const paginateQuery = (queryString, pageNumber, limit) => {
    let paginatedQuery = queryString;
    let newLimit = parseInt(limit) || 10;
    const offset = ((parseInt(pageNumber) || 1) - 1) * newLimit;
    paginatedQuery += ` OFFSET ${offset} LIMIT ${newLimit}`;
    return paginatedQuery;
}