import { Request, Response } from "express";
import Lead from "../model/Lead";

export const getLeads = async (req: Request, res: Response) => {
  const {
    page = 1,
    status,
    source,
    search,
    sort = "latest",
  } = req.query;

  const query: any = {};

  if (status) query.status = status;

  if (source) query.source = source;

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

   const sortOption: any =
  sort === "oldest"
    ? { createdAt: 1 }
    : { createdAt: -1 };

  const limit = 10;
  const skip = (Number(page) - 1) * limit;

  const total = await Lead.countDocuments(query);

  const leads = await Lead.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  res.json({
    success: true,
    data: leads,
    pagination: {
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
    },
  });
};

export const createLead = async (req: Request, res: Response) => {
  const lead = await Lead.create(req.body);

  res.status(201).json(lead);
};

export const updateLead = async (req: Request, res: Response) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json(lead);
};

export const deleteLead = async (req: Request, res: Response) => {
  await Lead.findByIdAndDelete(req.params.id);

  res.json({
    message: "Lead deleted",
  });
};

export const getSingleLead = async (
  req: Request,
  res: Response
) => {
  const lead = await Lead.findById(req.params.id);

  res.json(lead);
};