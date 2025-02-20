import gql from "graphql-tag";

export default gql`

    scalar Date
    scalar JSON

    directive @requireMe on FIELD_DEFINITION

`