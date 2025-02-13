import gql from "graphql-tag";

export default gql`

    scalar Date

    directive @requireMe on FIELD_DEFINITION

`