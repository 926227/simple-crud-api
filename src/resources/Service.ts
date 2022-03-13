type FuncWithData<reqT, resT> = (data: reqT) => Promise<resT | undefined>;
type FuncWithNoData<resT> = () => Promise<resT | undefined>;

// type MainFunction<reqT, resT> = FuncWithData<reqT, resT> | FuncWithNoData<resT>;

// abstract class AbstractService {
//   abstract mainFunction: Function;
//   abstract middlewares: [];
//   abstract run: Function;
//   abstract use: Function;
// }

class Service {
  protected middlewares: Array<() => Promise<void>> = [];

  public use = (func: () => Promise<void>): void => {
    this.middlewares.push(func);
  };

  protected runMainFunction = async (
    mainFunction: Function,
    data?: any
  ): Promise<any> => {
    let result;

    try {
      this.middlewares.forEach(async (middleware) => await middleware());
      result = await mainFunction(data);
    } catch (e) {
      console.log((e as Error).message);
    }
    return result;
  };
}

export class ServiceNoRequest<resT> extends Service {
  private mainFunction: FuncWithNoData<resT>;

  constructor(mainFunction: FuncWithNoData<resT>) {
    super();
    this.mainFunction = mainFunction;
  }

  public run = async (): Promise<resT | undefined> => {
    return this.runMainFunction(this.mainFunction);
  };
}

export class ServiceWithRequest<reqT, resT> extends Service {
  private mainFunction: FuncWithData<reqT, resT>;

  constructor(mainFunction: FuncWithData<reqT, resT>) {
    super();
    this.mainFunction = mainFunction;
  }

  public run = async (data: reqT): Promise<resT | undefined> => {
    return this.runMainFunction(this.mainFunction, data);
  };
}
