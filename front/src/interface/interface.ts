export interface MyState {
    app:{
      currentUser: any;
      isAuth: boolean;
      users: Array<string>;
      currentMode: string;
      adminData:any;
      usedByAdmin:boolean;
    }
    
  }