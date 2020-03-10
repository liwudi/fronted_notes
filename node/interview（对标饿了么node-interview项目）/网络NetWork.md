# Network

### TCP/IP

### UDP

### HTTP

### DNS

当我们访问一个域名时, 实际上需要的是访问对应的 IP 地址. 这时候, 获取 IP 地址的方式, 先是读取浏览器缓存, 如果未命中 => 接着读取本地 hosts 文件, 如果还是未命中 => 则向 DNS 服务器发送请求获取. 在向 DNS 服务器获取 IP 地址之前的行为, 叫做 DNS 本地解析.

### ZLIB

zlib 模块提供了 Gzip/Gunzip, Deflate/Inflate 和 DeflateRaw/InflateRaw 等压缩方法的类, 这些类接收相同的参数, 都属于可读写的 Stream 实例.

### RPC

基于 TCP/IP 来实现调用远程服务器的方法, 与 http 同属应用层. 常用于构建集群。

1、Thrift
2、HTTP协议进行RPC调用。
3、MQ消息队列调用RPC。
