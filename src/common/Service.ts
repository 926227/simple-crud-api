type FuncWithData<requestT, responseT> = (
  data: requestT
) => Promise<responseT | undefined>;
type FuncWithNoData<requestT> = () => Promise<requestT | undefined>;

interface CRUDServiceInterface<
  getAllRes,
  getReq,
  getRes,
  createReq,
  createRes,
  updateReq,
  updateRes,
  delReq,
  delRes
> {
  getAll: () => Promise<getAllRes | undefined>;
  get: (data: getReq) => Promise<getRes | undefined>;
  create: (data: createReq) => Promise<createRes | undefined>;
  update: (data: updateReq) => Promise<updateRes | undefined>;
  del: (data: delReq) => Promise<delRes | undefined>;
}

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

class ServiceNoRequest<responseT> extends Service {
  constructor(mainFunction: FuncWithNoData<responseT>) {
    super(mainFunction);
  }

  public run = async (): Promise<responseT | undefined> => {
    return await this.runMainFunction();
  };
}

class ServiceWithRequest<requestT, responseT> extends Service {
  constructor(mainFunction: FuncWithData<requestT, responseT>) {
    super(mainFunction);
  }

  public run = async (data: requestT): Promise<responseT | undefined> => {
    return await this.runMainFunction(data);
  };
}

export class CRUDService<
  getAllRes,
  getReq,
  getRes,
  createReq,
  createRes,
  updateReq,
  updateRes,
  delReq,
  delRes
> {
  getAll: () => Promise<getAllRes | undefined>;
  get: (data: getReq) => Promise<getRes | undefined>;
  create: (data: createReq) => Promise<createRes | undefined>;
  update: (data: updateReq) => Promise<updateRes | undefined>;
  del: (data: delReq) => Promise<delRes | undefined>;

  constructor({
    getAll,
    get,
    create,
    update,
    del,
  }: CRUDServiceInterface<
    getAllRes,
    getReq,
    getRes,
    createReq,
    createRes,
    updateReq,
    updateRes,
    delReq,
    delRes
  >) {
    this.getAll = new ServiceNoRequest(getAll).run;
    this.get = new ServiceWithRequest(get).run;
    this.create = new ServiceWithRequest(create).run;
    this.update = new ServiceWithRequest(update).run;
    this.del = new ServiceWithRequest(del).run;
  }
}
