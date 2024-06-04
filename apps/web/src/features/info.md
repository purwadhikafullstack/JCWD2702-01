Instead of dumping every feature's hooks and apis in a Hooks and Api folder, each feature will have its own Hooks and Api folder, and a folder for extra utilities such as Schemas.

Create new types.ts for interfaces

Folder tree sample:

> features
> auth
> login
> api

        -UseAuthLoginMutation.ts
      >hooks
        -UseAuthLogin.ts
      >schemas
        -LoginFormSchema

> users
> address
> api

        -UseFetchAddressQuery.ts
      >hooks
        -UseFetcgAdress.ts
      -types.ts

-type.ts
