<?php

namespace App\Repository;

use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Invoice|null find($id, $lockMode = null, $lockVersion = null)
 * @method Invoice|null findOneBy(array $criteria, array $orderBy = null)
 * @method Invoice[]    findAll()
 * @method Invoice[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InvoiceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Invoice::class);
    }

    public function findLastChrono(User $user)
    {
        return $this->createQueryBuilder("i")
            ->select("i.chrono")
            ->join("i.customer", "c")
            ->where("c.user = :user")
            ->setParameter("user", $user)
            ->orderBy("i.chrono", "DESC")
            ->setMaxResults(1)
            ->getQuery()
            ->getSingleScalarResult();
    }


}
