"use client";
import { useMemo, useState } from "react";
import { btnGhost, btnPrimary, inputCls, Panel } from "@/components/ui/panel";

const CODES: { code: number; name: string; description: string }[] = [
  { code: 100, name: "Continue", description: "The server has received the request headers and the client should proceed to send the request body." },
  { code: 101, name: "Switching Protocols", description: "The requester has asked the server to switch protocols and the server has agreed to do so." },
  { code: 102, name: "Processing", description: "WebDAV: server has received and is processing the request, but no response is available yet." },
  { code: 103, name: "Early Hints", description: "Used to return some response headers before final HTTP message." },
  { code: 200, name: "OK", description: "Standard response for successful HTTP requests." },
  { code: 201, name: "Created", description: "The request has been fulfilled, resulting in the creation of a new resource." },
  { code: 202, name: "Accepted", description: "The request has been accepted for processing, but the processing has not been completed." },
  { code: 203, name: "Non-Authoritative Information", description: "Returned meta-information is from a third-party copy and may not match the origin." },
  { code: 204, name: "No Content", description: "Server successfully processed the request, but is returning no content." },
  { code: 205, name: "Reset Content", description: "Server successfully processed the request; client should reset the document view." },
  { code: 206, name: "Partial Content", description: "The server is delivering only part of the resource (byte serving) due to a range header." },
  { code: 207, name: "Multi-Status", description: "WebDAV: the message body is XML containing multiple separate response codes." },
  { code: 208, name: "Already Reported", description: "WebDAV: members already enumerated in a preceding part of the response." },
  { code: 226, name: "IM Used", description: "Server has fulfilled a request and the response is a representation of result of one or more instance manipulations." },
  { code: 300, name: "Multiple Choices", description: "Indicates multiple options for the resource from which the client may choose." },
  { code: 301, name: "Moved Permanently", description: "This and all future requests should be directed to the given URI." },
  { code: 302, name: "Found", description: "Tells the client to look at (browse to) another URL." },
  { code: 303, name: "See Other", description: "The response can be found at another URI using a GET method." },
  { code: 304, name: "Not Modified", description: "Resource has not been modified since the version specified by If-Modified-Since headers." },
  { code: 305, name: "Use Proxy", description: "The requested resource is available only through a proxy. (Deprecated)" },
  { code: 307, name: "Temporary Redirect", description: "Repeat the request with another URI; future requests should still use the original URI." },
  { code: 308, name: "Permanent Redirect", description: "Request and all future requests should be repeated using another URI." },
  { code: 400, name: "Bad Request", description: "The server cannot process the request due to apparent client error." },
  { code: 401, name: "Unauthorized", description: "Authentication is required and has failed or not been provided." },
  { code: 402, name: "Payment Required", description: "Reserved for future use; sometimes used by digital payment systems." },
  { code: 403, name: "Forbidden", description: "The request was valid, but the server is refusing action." },
  { code: 404, name: "Not Found", description: "The requested resource could not be found but may be available in the future." },
  { code: 405, name: "Method Not Allowed", description: "A request method is not supported for the requested resource." },
  { code: 406, name: "Not Acceptable", description: "The requested resource is capable of generating only content not acceptable per the Accept headers." },
  { code: 407, name: "Proxy Authentication Required", description: "The client must first authenticate itself with the proxy." },
  { code: 408, name: "Request Timeout", description: "The server timed out waiting for the request." },
  { code: 409, name: "Conflict", description: "The request could not be processed because of conflict in the current state of the resource." },
  { code: 410, name: "Gone", description: "Indicates that the resource requested is no longer available and will not be available again." },
  { code: 411, name: "Length Required", description: "The request did not specify the length of its content, which is required by the resource." },
  { code: 412, name: "Precondition Failed", description: "The server does not meet one of the preconditions specified in the request headers." },
  { code: 413, name: "Payload Too Large", description: "The request is larger than the server is willing or able to process." },
  { code: 414, name: "URI Too Long", description: "The URI provided was too long for the server to process." },
  { code: 415, name: "Unsupported Media Type", description: "The request entity has a media type which the server or resource does not support." },
  { code: 416, name: "Range Not Satisfiable", description: "The client has asked for a portion of the file but the server cannot supply that portion." },
  { code: 417, name: "Expectation Failed", description: "The server cannot meet the requirements of the Expect request-header field." },
  { code: 418, name: "I'm a teapot", description: "RFC 2324 Hyper Text Coffee Pot Control Protocol; should not be implemented by actual HTTP servers." },
  { code: 421, name: "Misdirected Request", description: "The request was directed at a server that is not able to produce a response." },
  { code: 422, name: "Unprocessable Entity", description: "The request was well-formed but was unable to be followed due to semantic errors." },
  { code: 423, name: "Locked", description: "The resource that is being accessed is locked." },
  { code: 424, name: "Failed Dependency", description: "The request failed because it depended on another request and that request failed." },
  { code: 425, name: "Too Early", description: "Indicates that the server is unwilling to risk processing a request that might be replayed." },
  { code: 426, name: "Upgrade Required", description: "The client should switch to a different protocol such as TLS/1.3." },
  { code: 428, name: "Precondition Required", description: "The origin server requires the request to be conditional." },
  { code: 429, name: "Too Many Requests", description: "The user has sent too many requests in a given amount of time." },
  { code: 431, name: "Request Header Fields Too Large", description: "The server is unwilling to process the request because either an individual header or all the headers collectively are too large." },
  { code: 451, name: "Unavailable For Legal Reasons", description: "A server operator has received a legal demand to deny access to a resource." },
  { code: 500, name: "Internal Server Error", description: "A generic error message, given when an unexpected condition was encountered." },
  { code: 501, name: "Not Implemented", description: "The server either does not recognize the request method, or it lacks the ability to fulfill the request." },
  { code: 502, name: "Bad Gateway", description: "The server was acting as a gateway or proxy and received an invalid response from the upstream server." },
  { code: 503, name: "Service Unavailable", description: "The server is currently unavailable (overloaded or down for maintenance)." },
  { code: 504, name: "Gateway Timeout", description: "The server was acting as a gateway and did not receive a timely response from the upstream server." },
  { code: 505, name: "HTTP Version Not Supported", description: "The server does not support the HTTP protocol version used in the request." },
  { code: 506, name: "Variant Also Negotiates", description: "Transparent content negotiation for the request results in a circular reference." },
  { code: 507, name: "Insufficient Storage", description: "The server is unable to store the representation needed to complete the request." },
  { code: 508, name: "Loop Detected", description: "The server detected an infinite loop while processing the request." },
  { code: 510, name: "Not Extended", description: "Further extensions to the request are required for the server to fulfil it." },
  { code: 511, name: "Network Authentication Required", description: "The client needs to authenticate to gain network access." },
];

export default function HttpStatusCodes() {
  const [q, setQ] = useState("");
  const [klass, setKlass] = useState<"" | "1" | "2" | "3" | "4" | "5">("");

  const list = useMemo(() => {
    const needle = q.toLowerCase();
    return CODES.filter((c) => {
      if (klass && Math.floor(c.code / 100) !== Number(klass)) return false;
      if (!needle) return true;
      return String(c.code).includes(needle) || c.name.toLowerCase().includes(needle) || c.description.toLowerCase().includes(needle);
    });
  }, [q, klass]);

  function colorFor(code: number) {
    if (code < 200) return "text-blue-400";
    if (code < 300) return "text-emerald-400";
    if (code < 400) return "text-cyan-400";
    if (code < 500) return "text-amber-400";
    return "text-red-400";
  }

  return (
    <div className="space-y-4">
      <Panel title="Search">
        <div className="flex gap-2 flex-wrap items-center">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="404, not found, redirect…" className={inputCls("flex-1 min-w-[180px]")} />
          <div className="flex gap-1">
            <button className={klass === "" ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setKlass("")}>All</button>
            {(["1", "2", "3", "4", "5"] as const).map((k) => (
              <button key={k} className={klass === k ? btnPrimary("text-xs") : btnGhost("text-xs")} onClick={() => setKlass(k)}>{k}xx</button>
            ))}
          </div>
        </div>
      </Panel>
      <Panel title={`${list.length} codes`}>
        <ul className="divide-y divide-[var(--color-border)]">
          {list.map((c) => (
            <li key={c.code} className="py-2 flex gap-3">
              <span className={`font-mono text-lg w-14 shrink-0 ${colorFor(c.code)}`}>{c.code}</span>
              <div>
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-xs text-[var(--color-muted)]">{c.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
