type FuncWithData<requestT, responseT> = (
  data: requestT
) => Promise<responseT | undefined>;

type FuncWithNoData<requestT> = () => Promise<requestT | undefined>;

type MiddlewareFunction = (data: any) => Promise<any>

type FunctionWithUse<Req, Res> = {
  (data: Req): Promise<Res | undefined>;
  use: (func: MiddlewareFunction) => void;
}

type FunctionNoReqWithUse<Res> = {
  (): Promise<Res | undefined>;
  use: (func: MiddlewareFunction) => void;
}

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
  protected middlewares: Array<MiddlewareFunction> = [];

  constructor(mainFunction: Function) {
    this.mainFunction = mainFunction;
  }

  public use = (func: MiddlewareFunction): void => {
    this.middlewares.push(func);
  };

  public run = (data: any): Promise<any> => {
    throw new Error('Method <run> is not implemlemented ');
  };

  protected runMainFunction = async (data?: any): Promise<any> => {
    this.middlewares.forEach(async (middleware) => await middleware(data));
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
  getAll: FunctionNoReqWithUse<getAllRes>;
  get: FunctionWithUse<getReq, getRes>;
  create: FunctionWithUse<createReq, createRes>;
  update: FunctionWithUse<updateReq, updateRes>;
  del: FunctionWithUse<delReq, delRes>;

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
    this.getAll = withUse(new ServiceNoRequest(getAll)) as FunctionNoReqWithUse<getAllRes>;
    this.get = withUse(new ServiceWithRequest(get));
    this.create = withUse(new ServiceWithRequest(create));
    this.update = withUse(new ServiceWithRequest(update));
    this.del = withUse(new ServiceWithRequest(del));
  }
}

const withUse = <Req, Res>(service: ServiceNoRequest<Res> | ServiceWithRequest<Req, Res>): FunctionNoReqWithUse<Res> | FunctionWithUse<Req, Res> => {

  if (service instanceof ServiceNoRequest) {
    const s = service.run as FunctionNoReqWithUse<Res>
    s.use = service.use
    return s
  } else {
    const s = service.run as FunctionWithUse<Req, Res>
    s.use = service.use
    return s
  }

}
