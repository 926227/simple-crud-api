type FuncWithData<requestT, responseT> = (
  data: requestT
) => Promise<responseT | undefined>;
type FuncWithNoData<requestT> = () => Promise<requestT | undefined>;

class Service {
  private mainFunction: Function;
  protected middlewares: Array<() => Promise<void>> = [];

  constructor(mainFunction: Function) {
    this.mainFunction = mainFunction;
  }

  public use = (func: () => Promise<void>): void => {
    this.middlewares.push(func);
  };

  public run = (data: any): Promise<any> => {
    throw new Error('Method <run> is not implemlemented ');
  };

  protected runMainFunction = async (data?: any): Promise<any> => {
    this.middlewares.forEach(async (middleware) => await middleware());
    return await this.mainFunction(data);
  };
}

export class ServiceNoRequest<responseT> extends Service {
  constructor(mainFunction: FuncWithNoData<responseT>) {
    super(mainFunction);
  }

  public run = async (): Promise<responseT | undefined> => {
    return await this.runMainFunction();
  };
}

export class ServiceWithRequest<requestT, responseT> extends Service {
  constructor(mainFunction: FuncWithData<requestT, responseT>) {
    super(mainFunction);
  }

  public run = async (data: requestT): Promise<responseT | undefined> => {
    return await this.runMainFunction(data);
  };
}
