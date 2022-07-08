import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useApp } from "../../../hooks/app-context";
import { useAuth } from "../../../hooks/auth-context";
import { useSecureContext } from "../../../hooks/secure-http-context";
import { AuthTenantUserResponseDto } from "../../../models/auth-tenant-user-response.dto";
import { AuthRoutesStackParams } from "../../../routes/AuthRoutes";
import { DividerComponent } from "../../shared/DividerComponent";
import { NblocksButton} from "../../shared/NblocksButton";
import { BaseStyleComponent} from "../BaseStyleComponent";

const ChooseUserComponent:FunctionComponent = () => {

    const {name} = useApp();
    const navigation = useNavigation<NavigationProp<AuthRoutesStackParams>>();
    const {authService, didAuthenticate} = useSecureContext();
    const {switchUser, currentUser} = useAuth();
    const [users, setUsers] = useState<AuthTenantUserResponseDto[]>();
    const [selectUserId, setSelectedUserId] = useState<string>();


  useEffect(() => {
    if (!users) {
      authService.listUsers().then(users => {
        setUsers(users);

        // Show onboard user screen?
        if (users.some((user) => !user.onboarded))
          navigation.navigate('OnboardUser');
      });
    }
  });

  // useEffect(() => {
  //   if (!selectUserId && currentUser) {
  //     setSelectedUserId(currentUser.user?.id);
  //   }
  // }, [currentUser]);

  const signIn = async (): Promise<void> => {
    switchUser(selectUserId!)
    
    // Show onboard tenant screen?
    if (users?.some(user => !user.tenant.name))
      navigation.navigate('OnboardTenant');
    else
      didAuthenticate(true);
  }

    return (
        <BaseStyleComponent title={`Sign in to ${name}`} subTitle="Continue with the workspace for the organisation you want to log in to">
            {users?.map(user => 
                    <NblocksButton key={user.id} type={selectUserId === user.id ? 'primary' : undefined}  onPress={() => setSelectedUserId(user.id)} title={`${user.tenant.name ? user.tenant.name : "New account"} (${user.role})`}></NblocksButton>
                )}
                <DividerComponent />
                <NblocksButton type="primary" title="Sign in" onPress={() => signIn()} disabled={!selectUserId}/>
        </BaseStyleComponent>
    );
}

export {ChooseUserComponent};