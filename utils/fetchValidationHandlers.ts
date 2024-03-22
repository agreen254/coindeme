import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

/**
 * A wrapper for handling validation of POST requests.
 * Ensures both the body and response objects follow the expected schema.
 * 
 * T is the body,
 * U is the response,
 * V is the optional transformed response.
 *
 * @param req body of the request
 * @param bodyValidator zod object used to validate the body
 * @param responseValidator zod object used to validate the response
 * @param fetchUrlExtractor method used to get the fetch url
 * @param responseTransformer optional method used to alter the default response object, takes response and request body as inputs
 */
export async function postValidationHandler<T, U, V = any>(
  req: NextRequest,
  bodyValidator: z.AnyZodObject,
  responseValidator: z.AnyZodObject | z.ZodArray<z.AnyZodObject>,
  fetchUrlExtractor: (body: T) => string,
  responseTransformer?: (body: T, response: U) => V
) {
  const body: T = await req.json();
  const bodyValidation = bodyValidator.safeParse(body);

  if (!bodyValidation.success) {
    return NextResponse.json(
      { message: "Failed to validate request." },
      { status: 400 }
    );
  }

  const fetchURL = fetchUrlExtractor(body);

  const response = await fetch(fetchURL);
  if (!response.ok) {
    return NextResponse.json(
      {
        message: [response.status, response.statusText].join(" "),
      },
      {
        status: response.status,
      }
    );
  }

  const data = await response.json();
  const dataValidation = responseValidator.safeParse(data);
  if (!dataValidation.success) {
    return NextResponse.json(
      {
        message: "Failed to validate response.",
      },
      { status: 500 }
    );
  }

  if (responseTransformer) {
    return NextResponse.json<V>(responseTransformer(body, data));
  } else {
    return NextResponse.json(data as U);
  }
}

/**
 * A wrapper for handling GET requests.
 * Ensures the response follows the expected schema.
 * 
 * T is the response,
 * U is the optional transformed response.
 *
 * @param responseValidator zod object used to validate structure of response
 * @param fetchUrlExtractor method used to get the url
 * @param responseTransformer optional method for transforming the format of the response, takes response as input
 */
export async function getValidationHandler<T, U = any>(
  responseValidator: z.AnyZodObject,
  fetchUrlExtractor: () => string,
  responseTransformer?: (response: T) => U
) {
  const fetchURL = fetchUrlExtractor();

  const response = await fetch(fetchURL, { cache: "no-store" });
  if (!response.ok) {
    return NextResponse.json(
      {
        message: [response.status, response.statusText].join(" "),
      },
      {
        status: response.status,
      }
    );
  }

  const data = await response.json();
  const dataValidation = responseValidator.safeParse(data);
  if (!dataValidation.success) {
    return NextResponse.json(
      {
        message: "Failed to validate response.",
      },
      { status: 500 }
    );
  }

  if (responseTransformer) {
    return NextResponse.json<U>(responseTransformer(data));
  } else {
    return NextResponse.json(data as T);
  }
}
