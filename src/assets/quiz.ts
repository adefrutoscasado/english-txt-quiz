import { servicesVersion } from "typescript"

export default `

En que parte de AWS podemos encontrar los identity providers
IAM

What services are global in AWS?
IAM, S3, Route 53

Que tres tripos existen en IAM?
Users, Groups y Roles.

Como se llama el servicio que nos permite usar emails de terceros para utilizarlos como usuario IAM?
IAM Ferederation

En que OS no podemos utilizar SSH?
Windows < 10

Que protocolo es SSH?
TCP

Que protocolo utiliza HTTP?
TCP

Que puerto usa SSH?
22

Que puerto utiliza HTTP?
80

Que puerto utiliza HTTPS?
443

En que parte del dashboard de amazon podemos encontrar los SG?
EC2

We have timeout issues trying to conect a EC2, what could be the cause?
SG issues

A que puede hacer referencia un SG?
Ips, CIDR, another SG. (No instances!)

Para que sirve ROA?
Si se siera el caso de que tenemos una IP fija publica en nuestro on-premises y queremos migrarla a AWS, necesitamos hacer una peticion a ROA (Route Origin Authotization)

Que le ocurre a la IP publica de nuestra maquina EC2 cada vez que la reiniciamos?
Cambia, es dinámica.

Cuantas Elastic IP podemos tener como maximo (por defecto)?
5

Que es EC2 User data?
Un script bash que se ejecuta con cada reboot. Es bueno para la parte dinámica que pueda existir en alguna instalación (esta parte no la puede hacer AMI ya que es estatico)

EC2 on demand, para que es bueno?
Alto coste. Sin permanencia. Para cargas de un tiempo que no sepamos a priori y con una carga media pero constante.

EC2 reserved, para que es bueno?
Bajo coste pero con larga permanencia. Es bueno para BBDD por ej. Puede ser normal, scheduled (como la que utilizabamos en persei) o convertible (para cambiar el tipo)

EC2 Spot instance, para que es bueno?
Puede definir un coste maximo y la instancia correra hasta ese precio maximo. Spot block: Te dejan una instancia por un tiempo limitado. Bueno para analisis que no importa cuando hacerlo.

EC2 Dedicated hosts, para que es bueno?
Physical dedicated server. Full control over underlying sockets/cores. Useful for BYOL (Bring your own license)

EC2 types: R, C, M, I, G, T2/T3. Que es cada una?
(by order) RAM, CPU, Medium (medium ram, medium cpu), I/O y T2-T3 son burstable instances. En estas el rendimiento se basa en burst credits (buenas para unexpected load)

Tengo una instancia EC2 T2/T3 basada en burst credits, pero continuamente estoy perdiendo los creditos. Que puedo hacer?
Contratar una maquina mas potente, T2T3 no es para tu caso.

Para que es bueno AMI?
Para archivos etaticos de una instalacion. Permite usar una already-provisioned instance.

Que scope tiene una AMI para poder compartirla?
por region

EC2 Placemente Group Cluster, para que sirve?
Buena red ya que todas estan conectadas. Pero si una falla, todas fallan. Buena para big data

EC2 Placemente Group Spread, para que sirve?
High availability. Limited to 7. Apps that need isolation for each service.

Ec2 Placemente Group partition, para que sirve?
Mix de Cluster y de Spread. Un termino medio entre ambos.

Que es un ENI?
Una tarjeta de red virtual. LA podemos enganchar a la maquina que queramos on-the-fly.

En un load balancer que hacemos si alguna maquina EC2 nos reporta fallos en los Health Check:
Dejamos de mandar peticiones. No la terminamos ni la reiniciamos.

Que load balancer soporta enrutamiento por path?
Application Load balancer. Puede ser en funcion de hostname, path y query string. Es el unico!


Como podemos dirigir las peticiones a las maquinas en funcion del path de la ruta?
Usando ALB (Puede ser en funcion de hostname, path y query string). Es el unico!. Route 53 NO

Qué load balancer tiene una IP estatica por AZ?
Network load balancer

En que cabecera pueden ver las aplicaciones la IP original desde la cual se hace la peticion?
X-Forwarded-For

En que load balancer nos cuesta dinero rediriger a otra region?
Network load balancer

Cual es el load balancer mas rapido y con menos latencia?
Network load balancer

Que load balancer/s soportan SNI?
ALB y NLB.

Como podemos utilizar SNI en un classic load balancer que no lo soporta?
SNI combinado con Cloudfront.

En un EC2 auto escaling group, que criterio utilizamos para terminar ina instancia?
Elegimos la AZ con mas intancias, y luego la instancia con la oldest launch configuration. Luego se selecciona la que este mas cerca de su billing hour. Si coincide ya es random entre esas.

En un EC2 auto escaling group, que hacemos si los EC2 status checks nos indican que esta fallando pero la necesitamos (no ha habido eventos scale out?
La reemplazamos.

Si un LB indica que hay una instancia unhealthy, que hace el scaling group?
Nada, por defecto.

Cual es el cooldown period de EC2 auto escaling group por defecto?
300 segundos / 5 minutos

Que es EBS phemeral?
Una EBS en el que los datos no perduran en los reinicios, son efimeros.

Diferencia entre EBS Cold HDD y EBS STI HDD?
STI HDD es para datos accedidios frecuentemente (Big data, "necesito mucho espacio pero tambien acceder mas o menos rapido").  Cold HDD es para infrecuentes

Cual es el unico tipo de EBS en el que los IOPS aumentan con el tamaño?
GP2 (general purpose)

Cual es el unico tipo de EBS en el que los IOPS aumentan con la demanda (bursts)?
GP2 (general purpose)

EBS SNapshots, que pas acuando estamos haciendo uno en un EBS?
Lo podemos utilizar, unicamente bajan los IOPS.

Como se llama el servicio especial para hacer backups de Amazon?
Amazon Data Lifecycle Manager (DLM)

EBS Raid 0, para que es?
Para cOmbinar las capacidades de escriturao y lectura de dos EBS, a costa de mas riesgo (uno falla, todos fallan)

EBS Raid 1, para que es?
M1rroring a volume. Mas seguridad, mantenemos la capacidad como si fuera UNA SOLA.

EFS, para que sirve?
File system that can be mounted across multiple instances, multi AZ.

Tenemos una RDS Multi AZ, que ocurre si una AZ falla?
Su CNAME se cambia a la que está en stanby

En una RDS, como son las escrituras con read replicas ASYNC o SYNC?
ASYNC, toma tiempo para propagarse. (Eventually consistent)

En RDS, cuantas read replicas podemos tener maximo?
5

Para que RDS podemos utilizar IAM (RDS Auth Service) para loguearnos de manera nativa usando un token?
MySQL y PostgreSQL (Oracle no)

Como creamos un token temporal de acceso a RDS?
Con RDS Auth Service (IAM authentication), no STS

Unica tecnologia AWS de base de datos que soporta multi region?
Aurora

Para que es bueno Aurora en general?
Autoescaling based on use, Unpredistable wordload

Que es Aurora Serverless y que diferencia hay con Aurora normal?
Automaticamente inicia, apaga o escala la capacidad basada en las necesidades. Buenas para spikes de uso.

Podemos usar IAM EN Elasticache (Redis, Memcached)?
No, usamos un token (RedisAuth para redis). NO tiene integracion IAM como RDS.

Podemos hacer backups de Elasticache?
Solo de Redis.

En Route 53 que es redireccion hace un Record A?
URL to IPv4

En Route 53 que es redireccion hace un Record AAAA?
URL to IPv6

En Route 53 que es redireccion hace un Record CNAME?
URL to URL

En Route 53 que es redireccion hace un Record Alias?
URL to AWS Recource

En que consiste Route 53 simple routing policy?
El cliente recibe varias direcciones IP para un dominio y la direccion se elige aleatoriamente por el cliente, puede utilizarse para balancear.

Tengo una nueva version de la app con mejoras significantes y quiero dirigir un 5% de los clientes a la nueva version, como puedo hacerlo?
Usando Route 53 weighted routing

No puedo dar servicio en un pais debido al ambito legal de mismo. Como puedo negar el acceso a mi servicio?
Usando Route 53 geolocation routing policy

Route 53 Multi Value routing policy, en que consiste?
Es como el simple routing pero añadiendo un health check o condicion a cada ruta para que se incluta en la respuesta del DNS. IP A (Si condicion A), IP B (Si condicion B)

En un entorno MultiAZ, que ocurre si la AZ donde se encuentra la instancia princpial empieza a tener problemas?
El CNAME se cambia a la instancia en standby.

Que requisitos debemos cumplir en Route 53 para poder redireccionar una ruta a un sitio estatico e S3?
El nombre del bucket y la ruta deben ser similares.

Tiene coste mover archivos desde un EC2 a S3?
No, es gratis

Si queremos usar un algoritmo propio de encriptacion en S3, que tipo debemos usar?
Client side encryption?

Que tipo de encriptacion S3 necesita estrictamente HTTPS?
SEE-C, ya que la clave de encriptacion viaja en las cabeceras de la peticion.

En la encriptacion por defecto server-side de S3 (SSE-S3). que tipo se utiliza?
AES256

Que es S3 Amazon Macie?
ML-powered security service que nos ayuda a prevenir la perdida de datos mediante la deteccion automatica de informacion sensible en S3. Nos permite visualizar como estan siendo esos datos sensibles.

Que tipo de bucket utilizamos para pequeños archivos pero infrecuentes accesos?
S3 Standard IA

Que tipo de bucket utilizamos para datos redundantes y reproducibles?
S3 One Zone IA

Que tipo de bucket utilizamos para archivar datos?
S3 Glazier

Que tipo de servicio para S3 utilizamos para tareas de warehouse?
Redshift

Que es un S3 lifecycle ruke?
Define una accion (pasar a glacier en 30 dias por ej.). O una expiration action (eliminarse tras 30 dias en glacier sin acceso ninguno).

Alguien esta cambiando la configuracion de buckets S3, donde podemos comprobar los logs?
Los S3 access logs no contienen esta info. Debemos usar S3 CloudTrail.

Que nos permite Athena?
Servicio serverless que permite usar lenguage SQL para S3. Para realizar analitica. Se paga por query.

Como configuramos los permisos en Cloudfront para S3 de forma que solo sea accesibles a través de CloudFront?
Mediante OAI (Origin Access Identity) y actualizando los Bucket policies de S3.

Como permitimos el acceso desde un Cloudfront Edge a una maquina EC2?
Aceptando la IP pulica del edge location.

AWS Storage Extra, necesitamos mover 250 TB, que utilizariamos?
Varios Snowball, ya que Snowmobile es para 10^5 Tb (100Pb).

AWS Storage Extra, que capacidad tiene Snowball?
72 Tb

AWS Storage Extra, que capacidad tiene Snowball Edge?
80 Tb

AWS Storage Extra, que capacidad tiene Snowmobile?
>100Pb

Nuestro on-premises utiliza el protocolo SMB (server Message Block) para almacenamiento. Que servicio podemos usar para crear un almacenamiento hibrido en la nube?
AWS Storage gateway: File gateway

Nuestro on-premises utiliza el protocolo NFS para almacenamiento. Que servicio podemos usar para crear un almacenamiento hibrido en la nube?
AWS Storage gateway: File gateway

Nuestro on-premises utiliza el protocolo iSCSI para almacenamiento. Que servicio podemos usar para crear un almacenamiento hibrido en la nube?
AWS Storage gateway: Volume gateway

iSCSI, NFS, SMB. A que Storage gateway pertenece cada tipo de dispositivo?
iSCSI: Volume Gateway. NFS y SMB: File Gateway

SQS: Cual es el numero maximo de mensajes en la cola y el tamaño maximo del mismo?
120K por cola. 256 Kb/mensaje.

Cual es la retencion por defecto en SQS?
4 dias. Maximo 14.

Se ha procesado en mensaje SQS dos veces, cual puede ser el problema?
El visibility timeout es demasiado bajo.

Que es el dead letter queue (DLQ) de SQS?
Donde se almacenan los mensajes que han sido reasignados a la cola demasiadas veces y no han superado el redrive policy. Por lo que se descartan.

Que valor puede tener el long polling de SQS?
Entre 1 y 20 segundos.

Ventaja y desventaja de SQS FIFO?
Ventaja: mensajes en orden. Desventaja: perdida de rendimiento.

Maxima capacidad de SQS FIFO?
300 msg/sec y 3000 msg/sec without batching

Como podemos garantizar el orden en Kinesis, incluso si estamos utilizando shard?
Mediante un partition key

En Kinesis, tnemos un stream de clicks, pero no podemos diferencias el usuario. Como podemos diferenciarlos?
Usando un partition key.

Cual es la capacidad de escritrua y de lectura de un shard de Kinesis?
1 Mb y 2 Mb.

En que servicios podemos cargar datos usando Kinesis Data Firehouse?
Redshift, Amazon S3, ElasticSearch y Splunk.

Queremos acceder desde lamba a una RDS, como debemos usar los permisos?
Deberiamos asignar permisos a la IAM de Lamba en RDS.

Como se despliega una Lambda function en Canary?
Escalado en dos incrementos por intervalos

Como se despliega una Lambda function en Linear?
Escalado de forma lineal por minutos (escalones de 1 minutos asta completar el 100%)

Timeout de una funcion de duracion de ejecucion lambda? Podemos cambiarla?
15 minutos MAXIMO. No se puede aumentar.

Max deplotment size of lamba function?
50 Mb

Que nis permite DynamoDB streams?
Contienen los cambios que se realizan en la bd, y pueden ser encadenados a funciones lambda que por ejemplo manden emails con una nueva entrada en un documento.

Que base de datos puede utilizarse como cache debido a su rapidez y almacenamiento key-value?
DynamoDB

Que base de datos puede utilizarse como almacenamiento de sesion?
DynamoDB, usando su funcion TTL (Time to live)

Dynamo On demand vs Dynamo standard (auto escaled). Que usaremos en produccion y en development?
On demand > development. Standard > Produccion

Que es dynamoDB DAX:
A cache layer to improve dynamodb READ y WRITE capacity (principalmente READ).

AWS Api Gateway, que podemos utilizar para evitar picos/bursts/spikes:
Throttling limits. Manda un 429 too many requests cuando un usuario sobrepasa el limite de uso. El cliente tendra que repetir la operacion.

Como podemos mejorar el rendimiento de AWS API Gateway cuando tenemos contenido muy estático?
Activando API Gateway caching.

Que es AWS SAM:
Serverless Applitacion Model. Un framework de Amazon para crear apps serverless con Lambda, DynamoDB. API Gateway y Cognito.

Que devuelve Cognito al autenticarse?
Un cognito ID o JWT.

Si Redshift y Athena nos permiten usar lenguage SQL en S3, cual es la diferencia?
Redhist no permite hacer queries en glacier u otros servicios que tenga un tiempo de espera alto.

Queremos hacer queries parciales sobre DynamoDB, que servicio podemos utilizar?
ElasticSearch permite queries parciales, algo que el propio Dynamo no.

Dentro del monitoreo de CloudWatch encontramos Detailed Y Custom, que resolucion nor permiten?
Detailed > 1 minuto (extra para metrica por defecto). Custom > 1 segundo.

Tenemos una maquina EC2 que se congela continuamente y no podemos acceder mediante SSH. Que podemos hacer para visualizar los logs?
Usar CloudWatch.

Cual es la esolucion de las alarmas de cloudwatch?
Entre 10 y 30 segundos.

Durante cuanto tiempo es valido el token de STS?
Hasta 1 hora

Que servicios nos permiten acceder a servicios de AWS sin tener un IAM explicito asignado?
STS y Cognito (aunque se principal funcion es autenticar al usuario, no proveer al usuario de acceso a los recursos de AWS).

Necesitamos un identity Fereation pero nuestro sistema no es compatible con SAML2, que podemos utilizar?
Custom Identity Broker Application

Queremos montar un Identity Federation con los usuarios de windows y basado en web, que podemos utilizar?
ADFS (Active directory FS)

Queremos montar un Identity Federation con las cuentas de Google, que podemos utilizar?
SAML 2.0 is primarily used to let users sign in via a well-known external identity provider (IdP), such as Login with Amazon, Facebook, Google. It does not utilize Active Directory.

De manera general, cual es la forma de evitar un ataque MITM (Man in the middle)?
Utilizando HTTPS.

QUé tres tipos de claves (CMK - Customer Master Key) podemos manejar en KMS?
Default (CMK) creadas y manejadas por amazon. Custom keys creadas en KMS. Custom keys creadas por el cliente.

Cuando debemos usar Envelope Encryption vs Default KMS Encruption:
Cuando los datos sean mayor de 4 Kb

Podemos encriptar parametros en AWS Parameter Store?
Si, en integracion con KMS. Estos se desencriptaran en tiempo de ejecucion.

Qué dos ventajas princpiales tiene AWS Secret Manager?
Rotación de valor del parámetro e integracion con RDS.

Qué servicio nos permite protegernos de ataques de inyeccion SQL?
AWS Web Application Firewall (WAF)

Qué servicio añade proteccion Cross Site Scripting?
AWS Web Application Firewall (WAF)

Qué servicio añade proteccion DDoS?
AWS Shield

Qué protecciones añade AWS Shield?
Proteccion DDoS

Qué protecciones añade AWS Web Application Firewall?
Cross Site Scripting, inyeccion SQL. Tambien se pueden bloquear paises o IPs concretas. Entre otras cosas.

La normativa HIPAA para datos de salud nos exige qué niveles de encriptacion?
server-side AES256 o Client-side con claves propias

Cuando tenemos un CIDR de /32 Cuantas IP admite el rango?
Solo una

Cuando tenemos un CIDR de /31 Cuantas IP admite el rango?
Solo dos. 2^(32-31) = 2

Cuando tenemos un CIDR de /30 Cuantas IP admite el rango?
Solo dos. 2^(32-30) = 4

Cuando tenemos un CIDR de /24 cuantos numeros se pueden cambiar?
Solo el ultimo

Que requisitos hay en el rango de CIDR de dos VPC que usemos de manera simultanea?
Que no haya overlap de los rangos.

Del CIDR 10.0.16.0/20 esperamos 4096, pero AWS solo nos dice que tenemos 4091 IPs, por que?
AWS reserva 5 ips, cuatro primeras y ultima.

Que es necesario para que una EC2 tenga internet en una VPC?
Internet Gateway, Crear tura de internet en el router. (Para hacer ping necesitariamos protocolo IMCP activo en el router.)

A que rutas (orden) se da mas prioiridad en un router de un VPC?
Lowest to highest.

No podemos acceder a un puerto de una maquina en una VPC y ya hemos incluido du IP en el router? que puede estar pasando?
El SG de la maquina debe aceptar ese acceso a ese puerto.

NAT instance vs NAT Gateway, que ventaja principal ofrecen Gateway?
bandwith, less admin, availability. Autoscaling form 5 Gbps to 45.

Como conseguimos High Availability en una NAT Gateway?
Añadiendo multiple NAT across AZ.

Necesita NAT Gateway SG?
No.

Hay un rango de IPs sospechosas que estan atacando una flota de EC2 en una VPC. Que podemos hacer para bloquearlas?
Denegar acceso en el rango Inbound

Que permite inbound y outbound por defecto?
All y all. Las reglas son evaluadas siempre para el que realiza la peticion.

Despues de instalar una VPC Peer que debemso hacer para permitir la comunicacion?
Actualizar los routers de los VPC.

Que dos servicios utilizan VPC Endpoint Gateway?
S3 y DynamoDB

Como es la manera correcta configurar un Bastion Host en cuanto a seguridad?
Aceptar solo puerto 22 (SSH) unicamente para tu IP en su SG. Colocarlo en la public subnet.

Site to Site VPN, utiliza internet publica o privada?
Publica, como alternativa tenemos Direct Connect.

Direct Connect, utiliza internet publica o privada?
Privada, al contrario de Site to Site VPN. Ademas tenemos mas ancho de banda y coste menor.

Egress Only Internet Gateway, para que sirve?
Permite manejar IPv6 en VPC. Tan pronto como una instancia es IPv6, es publica. Nos permite poder acceder a internet desde IPv6 sin hacerlas publicas estrictamente.

Cual es el limite maximo de subida en S3 utilizando multipart?
5TB

Cual es el tamaño maximo de una peticion PUT de S3?
5GB

A partir de que tamaño se recomiendo subida multipart?
100 mb

Provee colas SQS FSIFO un sistema para procesar el elemento una unica vez?
Si

Proveen colas SQS el orden de los mensajes?
No

Tenemos una VPC con varias maquinas EC2 a las que podemos acceder por internet. Hemos añadido una que tiene el SG de las otras pero no podemos acceder. Cual puede ser el problema?
Debe tener asignada una public IP o, en su defecto, una Elastic IP

Necesitamos real-time processing of streaming big data. Que podemos utilizar?
Kinesis Data Firehouse (Prepara y carga los datos de manera continua y los destina al servicio de tu eleccion) + Kinesis Data Streams (Real time processing)

Cuando creamos un EBS snapshot se crea totalmente o es incremental?
Incremental

Acabo de hacer PUT de un elemento S3. Inmediatamente hago GET. Que obtendgo?
El element antiguo o el elemento nuevo, pero nunca datos corruptos (PUT eventually consistent). Por ejemplo si reemplazamos un objeto de 5 GB, amazon necesita tiempo para hacer ese cambio. Si hacemos peticiones paralelas podemos tener este tipo de errores (cada uno puede recibir cosas distintas)

Acabo de hacer DELETE de un elemento S3. Inmediatamente hago GET. Que obtendgo?
El element antiguo o la respuesta de que no existe, pero nunca datos corruptos (DELETE eventually consistent). Si hacemos peticiones paralelas podemos tener este tipo de errores (cada uno puede recibir cosas distintas)

Estoy intentando lanzar un script en 50 maquinas EC2 en una AZ. Sin embargo, tras 20 maquinas, empieza a generar fallos. Que ocurre?
Hay un limite basado en vCPU por defecto por region. Hay que hacer una peticion a Amazon mediante un formulario para cambiarlo.

Cual es el tamaño maximo de un objeto S3?
5 Tb

Para que sirve S3 Transfer Acceleration?
Permite transferencias rapidas, faciles y seguras en S3. Ayudandose de las AWS Edge locations de Cloudfrount (segun Stephane solo subidas).

Puede haber cuantas AZ por subnet?
1 por AZ

Cuando corremos una Instancia RDS en despliegie Multi-AZ, podemos usar la instancia standby operaciones read (read replica) o write?
No, la estancia standby no puede realizar ninguna accion mientras la instancia primaria este corriendo.

Tenemos dos read replicas en Aurora, como podemos balancear la carga entre las dos?
Usando los propies Reader Enpoint de Aurora, estos ya realizan la funcion de balanceo.

Que nos permite S3 Expedited Retrieval y en qué tipo de Bucket está disponible?
Nos permite recuperar archivos de manera urgente en S3, evitando largas esperas en Glacier (NO DISPONIBLE EN DEEP GLACIER ARCHIVE!).

En que Load Balancer viene activado Cross-Zone Load Balancer por defecto?
ALB. En CLB y NLB hay que activarlo.

Que es Active-Active failover en Route 53?
Siempre se incluyen todos los servicios para que se usen, tanto los primeras como los secundarios. Si uno falla, simplemente se "elimina" de la lista de servicio disponibles y se deja de mandar peticiones.

Que es Active-Pasive failover en Route 53?
Se empiezan a redirigir a los servicios secundarios (que se encuentran en standby) unicamente cuando el primera falla.

Para que sirve CreationPolicy en CloudFormation?
Es un evento invocado cuando la creacion de un recurso esta listo. Para resolver problemas de asincronia

Que es AWS AppSync?
Una especie de Firebase de Amazon. Usa GraphQL, real time subscriptions, Dynamo/lambda intregrations...

Diferencia entre Cost Explorer y AWS Budget?
Cost explorer te permite visualizar como gastas el dinero en Amazon. AWS Budget te permite establecer presupuestos y controlarlo (alertas email incluidas).

Cuando las ENI se desconectan de una EC2, estas se detienen?
No

EC2 Reserved Instances, como varia el precio cuando una instancia esta corriendo, parando o terminada?
No varia, siempre ese el mismo.

EC2 Reserved Instances, no necesitamos mas su uso y hemos pagado ya un año, que podemos hacer?
Venderla en AWS Rserved Instance Marketplace. Además, debemos terminarla cuanto antes para que no se nos hagan cargos en regimen On-Demand cuando el plazo acabe.

Diferencia entre "Data Protection" y "Data Protection at rest"?
"Data Protection" se refiere a proteger los datos in transito (mientras vuela a Amazon) y "Data Protection at rest" se refiere a mientras esta almacenado.

Diferencia entre las acciones de S3 "s3:ObjectRemoved:DeleteMarkerCreated" y "s3:ObjectRemoved:Delete"?
El primero es la marca de que un archivo esta eliminado (cuando se usa versionado) y el segundo es cuando un objeto se elimina permanentemente.

Qué determina el coste de uso de Cloud Formation?
Las plantillas de Cloud Formation son gratis, unicamente tienen coste los recursos que utilizan.

Cual es la mayor ventaja de usar una VPN en AWS?
Te permite conectar tu nube AWS a tu on-premises usando sesiones privadas con IP Secutiry (IPSec) y tuneles TLS.

Que permiso necesitamos para copiar objetos S3 de un bucket a otro de otra cuenta?
Cross-account permissions para S3 en IAM.

Que nos permite AWS Beanstalk?
Desplegar y gestionar aplicaciones de manera sencilla y rapida. Simplemente subes tu app y el se encarga de load balancing, provisioning y application health monitoring. Parecido a Heroku diria

Que es Glacier Vault Lock?
Te permite forzar el cumplimiento de ciertos ciclos en S3 Glacier. Por ejemplo, no eliminar los archivos al menos durante 1 año (para cumplir con ciertas normativas)

Como salvaguardar disaster recovery en Redshift?
Cross-Region Snapshots en el Cluster de Redshift

Tenemos un gran set de archivos CSV en S3, como podemos aplicar SQL queries para obtener estadisticos de los datos?
Athena puede hacer queries directamente sobre el contenido, ya sea estrcturado, semi-estrcturado o desestructurado. Algunos ejemplos son CSV, JSON,...

Tenemos un servicio de pedidos online y de ninguna forma podemos tolerar cobros repetidos en nuestro sistema de colas SQS, que podemos utilizar?
SQS FIFO provee de Exactly One processing (vs "al menos uno" de SQS estandar), First in first out delivery y high throughput (vs el ilimitado de SQS estandar)

Para que sirve AWS Transit Gateway?
AWS Transit Gateway permite conectar muchas on-premises, VPNs, y VPCs soportando inter-region (colocadas en cada region) para que enrute todo el trafico a traves de un unico centro de transito.

Cual es el protocolo de FTP?
TCP

Cual es el puerto de FTP?
20 y 21

Que usa CloudTrail para almacenar los logs?
S3

Donde podemos encontrar los Flow Logs?
Son los logs de VPC

Para que sirve Connection Draining?
Permite que el load balancer vaya poco a poco quitando las conexiones a una maquina para que esta pueda terminar las peticiones que esta procesando en un evento de scale in.

Como podemos hacer que un bucket S3 tenga acceso publico para server archivos estaticos?
Podemos setear los permisos como publicos durante el upload del atchivo. O Simplemente configurando sus policies para setear todos los objetos como publicos.

Como podemos asegurar la integridad de los datos de un bucket S3 en un desastre?
Activando cross-region Replication

Para que sirve AWS X-Ray?
Para trazar, debuguear y analizar las peticiones que viajan a desde API Gateway (o microservicios) hasta los servicios que llama, de forma que podamos detectar fallos de rendimiento.

Protocolo de ping?
IMCP

Que es Redshift Spectrum?
Nos permite hacer queries directamente sobre S3, pero a diferencia de Kinesis que es serverless, necesitamos una instancia/cluster

Que servicio de Amazon nos permite Massively Parallel Query Execution para hacer analiticas?
Redshift. Con esta y otras características nos ofrece una rendimiento de hasta 10x para tareas de analítica respecto a otras soluciones.

Cual es el servicio principal de AWS que se nos viene a la mente cuando hablamos de "real time" big data?
AWS Kinesis

Que nos permite los servicios de Kinesis: Stream / Analytics / Firehouse?
Streams: Ingesta de streaming de latencia baja a gran escala (big data). Analytics: Aplicar queries SQL en tiempo real. Firehose: Cargar los streams en S3, Redshift, ElasticSearch...

Cuanto tiempo se retiene los datos de un shard de Kinesis?
Por defecto 1 dia. Puede ser hasta 7 dias.

Podemos reproducir datos en SQS, SNS o Kinesis?
Solo en Kinesis.

Cuando usamos Decoupling, que dos servicios estan preparados para aceptar multiples consumidores de los datos?
SNS y Kinesis

Podemos eliminar datos en Kinesis?
No, los datos son inmutables

Podemos cambiar el numero de Shards y escalarlo?
Sí (se llama reshard). "MergeShare" para disminuir numero. "UpdateShardCount" para aumentarlo.

Como se determina a qué shard se envía un dato en Kinesis?
Mediante su clave de mensaje (message key), una cabecera que contiene el id hasheado. Si todos apuntan al mismo se producirá hot partition.

Qué es hot partition en Kinesis?
Todos los mensajes con datos tienen una cabecera que contiene el id hasheado. Si todos apuntan al mismo se producirá hot partition. Tenemos que distribuirlos por nuestros shards (Carreteras de datos)

Qué significa el mensaje ProvisionedThroughputExceeded en Kinesis?
Nos hemos pasado del limite que admite el shard de Kinesis. No podemos pasarle tantos datos.

S3 IA, que significan las siglas?
Infrequent Access.

Qué significa on-premises?
Algo que corre en la oficina del usuario, no en el cloud.

AWS Fargate, que nos permite?
Construir una imagen del contenedor definiendo su memoria, recursos... Para despues correrlas pagando unicamente por lor recursos que estan consumen y olvidandonos de toda la gestion del contenedor (definir EC2, provisionar, ejecutar...)

Que es AWS SES?
Simple Email Service. Mas caro que SNS. Si quieres hacer monitoreo de instancias, hay que usar SNS.

Que nos permite AWS OpsWorks?
Herramientas DevOps para gestionar tareas repetitivas en servidores. Chef y Puppet son soluciones open source que ofrece.

Que es AWS WorkSpaces?
Escritorios remotos seguros. Integrados con Microsoft AD.

En Route 53, que es MX Record?
Mail eXchange Record

AWS DLM que es?
Data Lifecycle Manager

AWS CM que es?
Certificate Manager

Que es una EBS-Backed EC2?
Una instancia EC2 que usa EBS como volumen de almacenamiento como su dispositivo raiz. Nos permite que si la instancia EC2 falla, podamos llevarnos ese EBS a otra nueva instancia sin problema.

Que es un ECS task?
Se traduciria por cada instancia que esta corriendo un container. Si tenemos 5 docker corriendo la misma app, tendriamos 5 tasks (ya sea en una instacia o multiple instancias).

Los snapshots de un EBS que usa encriptacion son automaticamente encriptados, verdadero o falso?
Verdadero

La informacion que viaja on-transit desde un EC2 a un EBS que usa encriptacion no esta encriptado, verdadero o falso?
Falso, sí viaja encriptado

Para que sirve AWS Glue?
Es un servicio gestionado por amazon para extraer, transformar y cargar (ETL: extract, transform, load) datos para ser analizados. AWS Glue inspecciona los datos a los que apuntes para que puedas buscar y ejecutar queries.

En Aurora, si tenemos fallos en la base de datos primaria, que acciones toma?
Aurora primero intentará  crear una nueva instancia en el mismo AZ. Si no es posible, lo intentará en una AZ diferente

No tenemos mucho dinero y queremos usar un EBS para una base de datos y una app con archivos en el mismo EBS con hasta 460 Gb de espacio, qué tipo debemos escoger?
GP (General Purpose)

Podemos usar Route 53 weighted routing en combinacion con failover?
No

Qué health checks usamos para una aplicación web?
HTTP o HTTPS health checks

Si tenemos una spot instance que cuesta 0.04 €/h y se ha terminado debido a que se ha detectado un incremento del precio se nos cobrará mas de lo acordado?
No, nunca se cobrará mas de 0.04 €/h

Cual es el tiempo maximo que puede tardar S3 Glacier en recuperar un objeto?
12 horas

Qué servicio se nos viene a la cabeza cuando hablamos de distributed session data management?
AWS ElastiCache. Cookie stickiness podria ser una opcion alternativa pero tiene muchas limitaciones.

Estamos usando CloudHSM (Hardware Security Nodule) para almacenar nuestras claves. Debido a logins fallidos, el modulo ha sido borrado. Como podemos recuperar las claves?
No podemos, se han perdido permanentemente.

AWS Storage Gateway: En qué consiste Cached volumes?
Almacenamos nuestros archivos en S3, pero retenemos en los dispositivos on-premises los de acceso frecuente. Solo compatible con iSCSI (forma parte de Volume Gateway).

AWS Storage Gateway: En qué consiste Stored volumes?
Es un Volume Storage que realiza automaticamente una copia en S3 de manera asincrona.

Qué dos tipos encontramos en AWS Storage Gateway: Volume Gateway?
Stored Volume y cached volumes

Dónde configuramos los database-specific settings de una intancia o grupo de RDS?
Parameter Group

Cual es el minimo tiempo que se cobra por estar un objeto en cada tipo de buket?
S3 standard: 0 dias. S3 Glacier: 90 dias. Glacier Deep Archive: 180 dias. Resto (IA): 30 días. Para los bucket IA, deben permanecer al menos 30 dias en el bucket ANTERIOR antes de moverlos a una IA.

Scaling policies: Target Tracking Scaling, en qué consiste?
Establece el escalado basado en una metrica specifica. Similar a como funciona un termostato en casa.

Scaling policies: Step scaling, en qué consiste?
Establece el escalado basado en un set de "step ajustements", que varían en funcion del unbrales o "pasos" de una alarma

Scaling policies: Simple scaling, en qué consiste?
Establece el escalado basado en un unico "single ajustement".

Scaling policies: Scheduled scaling, en qué consiste?
Establece el escalado basado en patrones de uso previsibles.

EBS Snapshots son point in time, qué significa?
Funcionan como un repo. Es decir podemos recuperar el estado en unos días atras, sin nececsidad de crear duplicados. Eso hace que un volumen de 10 GB tenga snapshots de peso superior, ya que contienen los cambios que han ido sucediendo.

EBS Snapshots son point in time por defecto?
Sí

Qué AWS Trusted Advisor?
Te provee de guia en tiempo real para ayudarte a gestionar tus recursos de amazon de manera correcta siguiendo las buenas prácticas.

Cuando creamos usuarios IAM de administracion para nuestro equipo? Qué debemos pasarles para que puedan empezar a usarlos?
Debemos pasarles las contraseñas. Ellos deben encargarse de cambiarlas o lo que sea necesario dependiendo de la politica de la empresa.

Queremos encriptar los logs de nuestra aplicación at rest. Estamos utilizando ClodTrail. Qué debemos hacer?
CloudTrail usa server side encryption por defecto.

Qué nos permite los VPC Endpoints?
Permiten contectar de manera privada servicios de AWS y VPCs. Tenemos Interface Endpoints y Gateway Endpoints.

VPC Endpoint: Interface endpoints, que son?
Permiten contectar de manera privada servicios de AWS y VPCs. En este caso sirve para practicamente todos los servicios de Amazon.

VPC Endpoint: Gateway endpoints, que son?
Permiten contectar de manera privada servicios de AWS y VPCs. En este caso sirve unicamente para DynamoDB y S3.

Qué protocolo expone Api Gateway?
HTTPS

Qué es AWS Database Migration Service?
Un servicio de Amazon que nos permite migrar rapidamente bases de datos en nuestros on-premises a la nube. Tambien se incluyen servicios como AWS Schema Conversion Tool para migrar distintas tencologias de base de datos.

Como podemos ver los logs de un Load Balancer?
Tienen un log propio donde podemos consultar las diferentes peticiones y sus horas.

Tenemos un contenedor docker que se encarga de tareas criticas y otras de analitica no esenciales. Que eligiriamos como EC2 para rebajar costes?
2 tipos, reserved y sport.

Cual es el único campo obligatorio en un template de CloudFormation?
Resources

Qué son MyISAM y InnoDB?
Motores de almacenamiento MySQL (diponibles para elegir en RDS). InnoDB es mas estricto y tiene mayor capacidad de recuperación de crashes (Recomendado por AWS). En cambio MyISAM tiene mas rendimiento.

Hemos reiniciado una instancia EC2 en un VPC. Cambiará su IP privada?
No. En cambio si estamos en EC2 Classic y no VPC, recibirá una nueva.

Cuanto tiempo toma a SG hacer efectivos los cambios?
Son efectivos inmediatamente.

AWS VPC soporta Multicast?
No, hay que contruir un IP level multicast across a network on the OS level of the instance.

Con qué servicio podemos desplegar en el mismo instante una nueva aplicación en un grupo de recursos?
AWS CodeDeploy

Qué recomendaciones existen para Placement Group, cuál es el limite de cantidad de instancias?
Lanzar todas las instancias A LA VEZ (lanza errores de insufficient capacity). Piensa que las instancias se reparten la capacidad cuando son iniciadas. Qué todas las instancias sean similares en cuanto a recursos. No existe límite.

Qué puerto utilizan los escritorios virtuales?
3389

Qué protocolo utilizan los escritorios virtuales?
TCP y UDP debe estar disponible en el SG.

Estamos utilizando S3 y Cloud Front sirve nuestra imagenes. Hemos cambiado un archivo pero el cliente no recibe la nueva imagen. De alguna forma se está cacheando. Qué podemos hacer para solucionarlo de la forma mas barata posible?
Podríamos invalidarlo en CloudFront pero sería muy caro. Usariamos versionado. Versioning enables you to control which file a request returns even when the user has a version cached either locally or behind a corporate caching proxy. If you invalidate the file, the user might continue to see the old version until it expires from those caches.

IPsec qué es?
(Internet Protocol security) Hace referencia a la conexión encriptada que utiliza Site-to-Site VPN.

Qué es Amazon Connect?
El servicio que vende y utiliza amazon para dar soporte y servicio de contacto para clientes. (Truco para distinguirlo: No contiene AWS)

Cómo movemos un EBS de un AZ a otro?
Creamos un snapshot y creamos un nuevo volumen en la nueva AZ usando el snapshot.

Cuando creamos un usuario a traves de CLI, qué permisos tiene por defecto?
Si lo creamos mediante contraseña ninguno. Si le asignamos Access Keys, los asociados a la misma.

Que son los Access Keys?
Permite llamar a servicios de amazon desde el CLI de Amazon. Siempre estan asociados a un usuario.

En qué condiciones un ElasticIP no incurre cargos?
Cuando esta asociada a una EC2, ésta está corriendo y sólo hay una EIP asociada a esa instancia.

AWS BeanStalk. Donde se guardan los archivos de la app? Dónde se guarda los logs que genera?
S3. S3 o CloudWatch.

Qué es AWS Organizations?
AWS Organizations offers policy-based management for multiple AWS accounts. With Organizations, you can create groups of accounts, automate account creation, apply and manage policies for those groups. Organizations enables you to centrally manage policies across multiple accounts,.

AWS hosts a variety of public datasets such as satellite imagery, geospatial, or genomic data that you want to use for your web application hosted in Amazon EC2.If you use these datasets, how much will it cost you?
No charge.

Que pasa si en CloudFront ponemos a 0 el Cache control max age?
Les peticiones viajarían directamente a las máquinas y no serían cacheadas en CloudFront

Qué es Blue/Green deployment?
Levantar una nueva aplicación con la actualización usando recursos totalmente nuevos (con el gasto que conlleva). Se puede testear y luego hace el switch para dirigir a la nueva aplicación (green)

Necesitamos que nuestros administradores puedan acceder a la diferentes cuentas que componen nuestro AWS Organization, que debemos utilizar?
IAM cross-account access.

Qué es CLOUDHSM?
Un servicio que permite almacenar claves en un modulo de hardware dedicado de un tercero y validado en cuanto a seguridad.

En qué momento nos puede ayudar MultiAZ además de con la caída de una zona?
Mientras se producen OS patches, system upgrades o db instance scaling.

Como podemos usar HTTPS en un RDS de AWS si se nos requiere (2 opciones!)?
Opción 1: Descargar el Root CA Certificate de Amazon y permitir solo el puerto 443 en el SG. Opcion 2: Si usamos IAM en el RDS automaticamente la comunicación se hará mediante el uso de un SSL. Opcion 3: Usar "rds.force_ssl" a true y resetear.

Qué requisito tiene el poder usar cross-region replication en S3?
Versionado. Piensa como si fueran el replicado async que hace RDS, necesitamos orden para poder replicar!

Necesitamos VPC peering entre diferentes regiones, que podemos usar?
Inter-Region VPC Peering

MultiPart Upload es secuencial o paralelo?
Paralelo, por lo que aumenta la velocidad final de la subida.

Qué es AWS Resource Access Manager (RAM)?
Permite compartir de forma segura recursos de Amazon cross-account o en combinación con AWS Organization.

Qué nos permite Signed Cookies de Cloudfront?
Las Signed Cookies de CloudFront permiten controlar quién puede obtener acceso a su contenido cuando no desea cambiar las URL actuales o cuando desea proporcionar acceso a varios archivos restringidos

Qué significa el parámetro --is-multi-region-trail en CloudTrail?
Sirve para trackear todos los cambios realizados en TODAS las regiones.

Qué significa el parámetro --include-global-service-events en CloudTrail?
Sirve para trackear todos los eventos realizados y llamadas API desde CLI y AWS Console.

Qué es Enhanced Monitoring?
Un tipo de monitoreo disponible en RDS que nos brinda una mayor precisión debido a que reside en una capa más fisica de la máquina. Nos ofrece más información de como se gestionan los thread en la CPU (RDS child processes and OS Processes)

Qué significa POSIX-compliant?
Being POSIX-compliant for an OS means that it supports those standards (e.g., APIs), and thus can either natively run UNIX programs, or at least porting an application from UNIX to the target OS is easy/easier than if it did not support POSIX

Qué es un cluster endpoint en Aurora?
Se conoce tambien como writer endpoint ya que conecta con la base de datos primaria de Aurora.

Qué es un instance endpoint en Aurora?
Conecta con una instancia específica en Aurora. El cliente toma la decisión de a qué instancia quiere dirigir su petición, en vez de dejar a Aurora decidir.

Qué es un reader endpoint en Aurora?
Conecta al pool de las read replicas disponibles en Aurora.

Permite Aurora crear custom endpoints en base a nuestro criterio y necesidades?
Sí

"AWS Directory Service: Managed Microsft AD" vs "AWS Directory Service: Simple AD" vs "AWS Directory Service: AD Connector", que son?
Managed Microsft AD: Create your own AD in AWS (manage users locally on premises). Simple AD es un AD maneja enteramente en AWS. AD Connector es un PROXY para tener el AD en tu entorno on-premises.

Qué instancias EC2 pueden ser "convertidas" a una de mayor capacidad?
Únicamente Convertible Reserved Instances

Lista de servicios que permiten el acceso al underlying OS?
Amazon EMR, EC2, ECS, Beanstalk, OpsWorks.

Aumentamos los IOPS de una instancia EC2 al aumentar su capacidad, al igual que GP EBS?
Sí

Qué es CloudFront Origin Failover?
Es el High Availability de CloudFront. Permite que, en caso de que un servicio al que está apuntando devuelva error, redirigir la petición a otro que ofrezca el mismo servicio.

CloudFormation: Resources, qué es?
Recursos de AWS que usaremos declarados en el template

CloudFormation: Parameters, qué es?
Inputs dinámicos que recibirá nuestro template (por ejemplo, numero de instancias que queremos levantar)

CloudFormation: Mappings, qué es?
Variables estáticas para nuestro template (imagino que serán constantes, por ejemplo un nombre)

CloudFormation: Outputs, qué es?
Referencias creadas para los recursos creados por la template.

CloudFormation: Conditionals, qué es?
Lista de conficiones para llevar a cabo la creación de un recurso.

Qué es WorkDocs?
WorkDocs es un servicio de almacenamiento cloud de archivos que compite con DropBox, Google Drive, OneDrive...

Qué es un ENI (Elastic Network Interface)?
Es un componente logico en una VPC que representa un tarjeta de red virtual, y nos permite dirigir tráfico a nuestra instancia

Queremos usar en Route 53 la direccion NON-ROOT: something.mydomain.com, qué tipo de target utilizaremos?
ALIAS o CNAME

Queremos usar en Route 53 la direccion ROOT: mydomain.com, qué tipo de target utilizaremos?
ALIAS

Como podemos hacer que varias queries queden registradas en DynamodDB pero si una falla, se haga rollback?
Utilizando Transacciones de DynamoDB

En qué consiste DynamoDB on demand?
No tenemos que proveer a dynamoDB de una capacidad WCU/RCU, sino que escala automaticamente. 2.5x mas caro

Cómo conseguimos cross-region replication en DynamoDB?
Usando Global Tables. Este tipo de tablas son replicadas a otra region de forma activa-activa (da igual la tabla que escribamos, se replicará a las demás, no existe una primaria que gobierne sobre las demas). Util para disaster recovery o BAJA LATENCIA en regiones!

En qué consiste la estrategia de disaster recovery Pilot Light?
La parte core crítica de la app y su entorno está corriendo siempre en el cloud, de manera que podamos proveer rápidamente una aplicación completa.

En qué consiste la estrategia de disaster recovery Warm Standby?
Una aplicacion COMPLETA en STANDBY esta corriendo, pero en el mínimo tamaño, de manera que podamos escalarla rápido.

En qué consiste la estrategia de disaster recovery Multi Site?
Varias aplicaciones COMPLETAS están corriendo a la vez y se encuentran activas. (Se reparten la carga)

En disaster Recovery, qués es RPO y RTO?
Recovery Point Objetive y Recovery Time Objetive (punto del tiempo que podemos recuperar HASTA el desastre y tiempo que tardamos en recuperarlo DESDE el desastre).

A la vez, necesitamos que las urls de CloudFront expiren. Que funcion de CloudFront podemos utilizar?
CloudFront signed URLs

Quién se encarga del OS Patching de EC2? AWS o nosotros?
Nosotros

Quién se encarga de gestionar el underlying network infraestructure de AWS? AWS o nosotros?
AWS

Network ACL qué es?
Es el "SG" para subnets, controla qué IPs tienen acceso inbound y outbound

Qué significa "warm attach" en ENI?
We attach the interface when the instance is STOPPED

Qué significa "hot attach" en ENI?
We attach the interface when the instance is RUNNING

Qué significa "cold attach" en ENI?
We attach the interface when the instance is BEING LAUNCHED

Provee S3 de AES128 encryption?
NO, solo AES256

Cuando hacemos Stop en una instancia que ocurre con los datos?
Se mantienen intactos

Cuando terminamos una instancia que ocurre con los datos?
Se eliminan

Que ventajas tiene EC2 Hibernate sobre Stop o Terminate?
La RAM no se pierde, así que el boot será mas rapido. La memoria RAM antes de detenerse se guardara en el root volume. El volumen tambien se guarda (obviamente, ahi es donde está la info de la RAM) (No puede hibernar mas de 60 dias)

ELB: Connection draining, con qué terminos se le reconoce según el tipo de balanceador?
Classic: Connection draining. Application y Network: Deregistration Delay.

Como se llama el EFS especial para Windows?
Amazon FSx

Qué es Amazon FSx?
Es el EFS especial para Windows (EFS no es compatible, debido a que es POSIX/Basado en Linux)

Que protocolos de almacenamiento soporta Amazon FSx?
SMB y NTFS

Para qué sirve Amazon FSx for Lustre?
(Lustre = Linux + Cluster, No tiene nada que ver con Windows!). Es un tipo de almacenamiento distribuido paralelamente, especial para Machine Learning, High Performance Computing. Usa S3 under the hood.

Pongamos que tengo 5 camiones que mandan informacion a Kinesis sobre su localizacion. Tan solo tengo 3 shards. Como se repartira la informacion?
Se repartiran uniformemente pero siempre manteniendo el shard. Ejemplo: 1,2 -> A | 3,4 -> B | 5 -> C

Qué nos permite AWS Config?
Permite auditar y llevar un histórico de la configuración de los servicios de Amazon.

Queremos pasar datos de un EFS en la region 1 a otro EFS en la region 2. Que podemos utilizar?
AWS DataSync

Cuales el principal servicio para mover grandes cantidades de datos entre regiones o volumenes on-premises?
AWS DataSync

EC2-Classic, que es?
Era la antigua forma en la que corrian las maquinas de Amazon. En vez de haber VPCs que isolaban la cuenta, todos los clientes compartian la misma red

El diseño de una base de datos para una aplicacion Online Transaction Processing (OLTP) es relacional o no relacional?
Relacional

Estamos usando una base de datos RDS y queremos que se encripte, como podemos hacerlo?
Take a snapshot of the database, copy it as an encrypted snapshot, and restore a database from the encrypted snapshot. Terminate the previous database.

S3 Event notification, qué nos permite?
Mandar notificaciones cuando ciertos eventos ocurren en el bucket. (SQS, ...)

En RDS si usamos encriptacion en la instancia principal, el resto cómo estará?
Encriptado tambien.

Podemos mandar un archivo directamente a S3 Glacier?
No, hay que mandarlo a S3 primero y luego usar un lifecycle.

EFS IA qué es?
Es una version de EFS que puede llegar a costar 92% menos que el standard. Para archivos que se acceden de manera infrecuente.

Queremos crear un Auto Scaling Group que use una mezcla de Spot y On-Demand. Qué podemos usar?
ASG Launch templates soportan este tipo de escalado

Como podemos crear efecto Availability Zone si tenemos asignado un Elastic IP a una maquina en concreto?
Debemos usar EC2 user-data para hacer ese cambio de maquina de la IP, en el caso de que se levantase una nueva al caerse la otra.

Una compañia tiene multiples AWS Organizations en multiples AWS Accounts. Necesitamos limitar una accion concreta para todas las cuentas y manejar esta restriccion de manera central. Qué podemos utilizar?
SCP (Service Control Policies) permite control central para el maximo nivel de gestion de permisos para todas las cuentas de una organizacion (incluso si son admin!).

Qué evento puede hacer que una base de datos RDS deje de dar servicio?
DB engine version change

Como podemos mejorar la latencia de un endpoint de AWS API Gateway?
Ya que por defecto API Gateway sirve desde el nearest point de cloudfront, no hay razon para usar cloudfront "encima". Habria que configurar un TTL y usar cache (no especifica como)

Como podemos aumentar el rendimiento de una base de datos a la vez que aumentamos su availability?
Creamos un RDS Replica como MultiAZ. Esto creara una db standby en otro AZ diferente a la original. Lo normal.

Como podemos ver la memoria consumida en Amazon Aurora?
Activando Enhanced Monitoring de Aurora.

Queremos acceder a dynamoDb desde una private subnet de nuestro VPC. Como podemos hacerlo?
Creat un VPC Gateway endpoint y añadir una entrada a la route table del VPC.

Cuando colocamos un cloudfront en frente de un ALB que apunta a una app web, como mejora la aplicacion?
Se cachean los contenidos estaticos y reduce las peticiones al ALB. Por lo que se necesita menos maquinas en el ASG

Necesitamos ver el log de acceso a nuestro bucket S3. Como podemos hacerlo?
Activar enable access monitoring de S3.

Como podemos programar backups de DynamoDB?
DynamoDb on-demand backup nos permite crear backups. Para programarlos necesitariamos utilizar cloudwatch + lambda ya que no tiene sistema para scheduling.

Podemos usar las instancia multi-AZ de Aurora como read replicas?
Sí, para Aurora sí! Super guais los de amazon

Podemos usar las read replicas de Aurora para aumentar Availability?
Sí, para Aurora sí! Super guais los de amazon

Qué dos acciones se pagan en KMS?
API requests por uso de claves y almacenar customer keys.

Cómo podemos trackerar la ram en una EC2?
EC2: Install the CloudWatch agent on the EC2 instance to push memory usage to an Amazon CloudWatch custom metric.

Amazon Cognito User Pool vs Amazon Cognito Identity Pool. Qué permiten?
User pools nos permite crear nuestra "piscina" de usuario (registro, login, pass recovery...). Identity nos permite autenticarlos contra servicios de  terceros (S3, DynamoDb, APIGateway...)

DynamoDB on-demand: necesitamos que escale. Qué característica podemos usar?
DynamoDB on-demand escala automaticamente ya que no lo decimos que capacidad queremos. Siempre escalara en funcion de la carga. (Sino seria provisioned)

Que es Task Definition en AWS ECS?
Define el container. Principalmente: imagen docker, cantidad cpu/ram, IAM Role

Como podemos utilizar HTTPS en load balancers?
Use an Application Load Balancer (ALB) with an HTTPS listener, then install SSL certificates on the ALB and EC2 instances. Use a Network Load Balancer (NLB) with a TCP listener, then terminate SSL on EC2 instances

Qué es Elastic Fabric Adapter (EFA)?
Its a network device similar to ENI that you can attach to an EC2 to accelerate High Performance Computing (HPC) and machine learning applications.

Qué es Elastic Network Adapter (ENA)?
Sirve para cuando necesitamos gran ancho de banda y latencia inter-estancia mas baja

Qué es S3 Intelligent-Tiering storage class?
Its designed to optimize costs by automatically moving data to the most cost-effective access tier, without performance impact or operational overhead. This is ideal when the access patterns are not well understood.

Qué podemos utilizar para mejorar la latencia de una app que sirve en una IP publica estatica?
AWS Global Accelerator. Cloud front no puede servir IP publica estatica!!

Qué diferencia hay entre AWS Global Accelerator y AWS Transfer Acelerator?
AWS Global Accelerator mejora la latencia de una app que sirve en una IP publica estatica (cosa que cloudfront no puede). AWS Transfer Accelerator mejora la velocidad solo en S3.

Cómo podemos reducir el tiempo de retrieve de DynamoDB from milliseconds to microseconds?
Usando DAX. ElasticCache no reduce tanto. (1x52)

Podemos aumentar o reducir la cantidad de Contenedores Tasks con CludWatch o necesitamos Lambda?
Sí se puede desde Cloudwatch

Route 53 Geoproximity. Qué permite?
Let Route 53 route traffic to specific instances based on the location of the INSTANCES AND the USERS

Qué servicio se salta la restricción de permanecer en S3 antes de mover los datos Glacier Deep Archive?
DataSync! Es el servicio especial para mover grandes cantidades de archivos (tanto on-premises como inter-region), por lo que tiene logica que pueda.

Un Elastic IP se libera al parar una instancia?
No

Se pierden los datos de una instancia EC2 cuando la paramos?
Sí

Se nos cobra cuando una Spot Instance esta stopping? Y una On-Demand?
La Spot NO se sobra, pero la On-Demand SÍ!

AWS EMR? Qué es?
Amazon EMR es la plataforma para big data para procesamiento y análisis de grandes volúmenes de datos

AWS Step Functions VS SWF, diferencias?
Step Functions ofrece una interfaz mas visual e intuitiva (recomendable para apps nuevas). SWF se recomiendan cuando existen "extenal deciders". Ademas, en Step Functions usamos JSON de manera declarativa y en SWF picamos el codigo directamente.

Para qué sirve Lamda@Edge?
Para realizar procesamiento de computo cerca del usuario usando los edge locations.

Bulk retrieval vs Expedited retrieval?
Bulk permite recuperar archivos de manera lenta (5-12 horas), de tal forma que no tiene apenas coste (para Glacier). Expedited lo contrario, permite recuperarlo rapido (1-5 minutos) con un coste mayor (para urgencias).

Puede apuntar NLB a contenedores Fargate?
Si

Que es AWS Neptune?
Amazon Neptune is a purpose-built, high-performance graph database engine optimized for storing billions of relationships and querying the graph with milliseconds latency.

Que volumen/es EBS se puede usar como boot bolume?
Los SSD.
`

// ECS vs Fargate
// Simple scaling vs tarjet scaling. Basadas en un unico valor pero no entiendo bien la diferencia

// clasic load balancer + unique ip + servir mediante SSL. -> Cloudfront + SNI? Sí

// HIPAA no recuerdo

// Si en aurora las multi AZ se utilizan como read replicas, que diferencia hay? Stephan 1x17
// Golden AMI que era???

// Secrets manager vs MKS. Guardar contraseña con rotacion cual? 2x18 de stephane

/*
Estudiar: 

X tema de logins y federations. 
X Repaso a redshift.
X Repado a los backups esos de S3 de volumenes on premise. 
X Repasar ciclos de S3 (cuando tiempo debe estar en cada uno).
  PrivateLink no se mucho
  Simple scaling vs tarjet scaling. Basadas en un unico valor pero no entiendo bien la diferencia
  Puertos y protocolos. Se me han olvidado!!!!!!!!!!!!!!!!!!!!!!
*/



/*
- Protocolos:
  TODOS TCP menos Ping (ICMP) y Remote Desktop (TCP+UDP)

- Puertos:
  FTP: 21
  SSH: 22
  SFTP: 22 (same as SSH)
  HTTP: 80
  HTTPS: 443
  Remote desktop: 3389

  // Menos importantes
  PostgreSQL: 5432
  MySQL: 3306
  Oracle RDS: 1521
  MSSQL Server: 1433
  MariaDB: 3306 (same as MySQL)
  Aurora: 5432 (if PostgreSQL compatible) or 3306 (if MySQL compatible)

*/

/*
Other services

CodeCommit: service where you can store your code. Similar service is GitHub
CodeBuild: build and testing service in your CICD pipelines
CodeDeploy: deploy the packaged code onto EC2 and AWS Lambda
CodePipeline: orchestrate the actions of your CICD pipelines (build stages, manual approvals, many deploys, etc)
CloudFormation: Infrastructure as Code for AWS. Declarative way to manage, create and update resources.
ECS (Elastic Container Service): Docker container management system on AWS. Helps with creating micro-services.
ECR (Elastic Container Registry): Docker images repository on AWS. Docker Images can be pushed and pulled from there
Step Functions: Orchestrate / Coordinate Lambda functions and ECS containers into a workflow
SWF (Simple Workflow Service): Old way of orchestrating a big workflow.
EMR (Elastic Map Reduce): Big Data / Hadoop / Spark clusters on AWS, deployed on EC2 for you
Glue: ETL (Extract Transform Load) service on AWS
OpsWorks: managed Chef & Puppet on AWS
ElasticTranscoder: managed media (video, music) converter service into various optimized formats
Organizations: hierarchy and centralized management of multiple AWS accounts
Workspaces: Virtual Desktop on Demand in the Cloud. Replaces traditional on-premise VDI infrastructure
AppSync: GraphQL as a service on AWS
SSO (Single Sign On): One login managed by AWS to log in to various business SAML 2.0-compatible applications (office 365 etc)

*/